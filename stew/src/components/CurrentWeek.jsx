export const CurrentWeek = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const pastDaysOfMonth = now.getDate() + firstDayOfMonth.getDay() - 1;
  const weekNumber = Math.floor(pastDaysOfMonth / 7) + 1;
  return {
    month: month,
    week: weekNumber,
    weekOfMonth: `${month}월 ${weekNumber}째주`
  };
};