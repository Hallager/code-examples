export function calculateDuration(dateFrom: Date | string | null, dateTo: Date | string | null): number[] {
    if (!dateFrom || !dateTo) {
      return [];
    }
  
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
  
    const diffMs = to.getTime() - from.getTime();
    if (diffMs < 0) {
      return [];
    }
  
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
  
    return [hours, minutes];
  }


  export function calculateDays(dateFrom: Date | string | null, dateTo: Date | string | null): number {
    if (!dateFrom || !dateTo) {
      return 0;
    }
  
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
  
    const diffMs = to.getTime() - from.getTime();
    if (diffMs < 0) {
      return 0;
    }
  
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }