import axios from 'axios';
import * as cheerio from 'cheerio';


// Функция для получения и парсинга данных с конкретного листа
export async function getDataFromGoogleSheet() {
  const url = 'https://docs.google.com/spreadsheets/d/1fmV8qGV-bFSPoZCgiSjz5mCbkDAPLxO_mW3eppglhlQ/htmlview';

  try {
    // Получаем HTML-страницу
    const { data } = await axios.get(url);

    // Парсим HTML с помощью cheerio
    const $ = cheerio.load(data);

    // Создаем массив для хранения данных
    const result: Array<{
      rowIndex: number;  // Поле для индекса строки
      firstName: string;
      tgUsername: string;
      profile: string;
      teamOrProject: string;
      isReg: boolean;
    }> = [];

    // Ищем таблицу конкретного листа
    const specificTable = $('table').eq(0); // Например, первая таблица на странице

    // Ищем строки только внутри этой таблицы, начиная со второй строки
    specificTable.find('tbody tr').each((index, element) => {
      if (index === 0) return; // Пропускаем первую строку (индекс 0)

      const columns = $(element).find('td');

      // Получаем данные из ячеек
      const firstName = $(columns[1]).text().trim() || ''; // Устанавливаем пустую строку, если пусто
      let tgUsername = $(columns[2]).text().trim(); // Это поле должно быть заполнено
      const profile = $(columns[3]).text().trim() || ''; // Устанавливаем пустую строку, если пусто
      const teamOrProject = $(columns[6]).text().trim() || ''; // Устанавливаем пустую строку, если пусто
      const isReg = false; // Условно не зарегистрирован

      // Форматируем tgUsername: убираем префиксы
      tgUsername = tgUsername.replace(/^https:\/\/t\.me\/|^@/g, '').trim(); // Убираем префиксы и пробелы

      // Проверяем, чтобы tgUsername был заполнен
      if (tgUsername) {
        result.push({
          rowIndex: index, // Индекс строки (с 1, так как пропустили заголовок)
          firstName,
          tgUsername,
          profile,
          teamOrProject,
          isReg,
        });
      }
    });

    // Возвращаем JSON-массив
    return result;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return [];
  }
}