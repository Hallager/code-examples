import { activityTypes } from "../supabase/entity";

export interface paginationDateItem {
    date: string;
    activitys: paginationActivity[];
  }
  
  export interface paginationActivity {
    activity_type: activityTypes;
    date_from: string;
    date_to: string;
    user: paginationActivityUser;
    data:any;
  }
  
  export interface paginationActivityUser {
    id: string|null;
    name: string|null;
  }