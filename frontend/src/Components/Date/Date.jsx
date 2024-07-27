function getDate() {
    let today = new Date();
    const dayToday = today.getDate();
    const monthNumber = today.getMonth() + 1;
    const monthName = today.toLocaleString('default', { month: 'long' });
    const yearToday = today.getFullYear();
    const todayDate = `${dayToday} ${monthName} ${yearToday}`
    let dateFormat = { day: dayToday, month: { monthName, monthNumber }, year: yearToday, fullDate: todayDate }
    return dateFormat;
}

export default getDate()
