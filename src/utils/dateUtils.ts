export function formatDateForInput(date: Date): string {
  return date.toISOString().slice(0, 16);
}

export function isWithinDateRange(
  date: Date,
  startDate: string,
  endDate: string
): boolean {
  if (!startDate && !endDate) return true;
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    return targetDate >= start && targetDate <= end;
  }
  
  if (startDate) {
    const start = new Date(startDate);
    return targetDate >= start;
  }
  
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    return targetDate <= end;
  }
  
  return true;
}

export function isUpcomingPost(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const postDate = new Date(date);
  postDate.setHours(0, 0, 0, 0);
  return postDate >= today;
}