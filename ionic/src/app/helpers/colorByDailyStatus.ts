import { DailyStatusType } from "../services/supabase/entity"

export interface colorDailyStatus{
    bg:string,
    icon:string,
    outline:string,
    icon_name:string
}

export function getColorByDailyStatus(statusType: DailyStatusType):colorDailyStatus{
  switch (statusType) {
      case DailyStatusType.check_in_out:
        return  {
            bg: "#ffffff",
            icon:"#92CBC4",
            outline:"#41A498",
            icon_name: "check"
        }
      case DailyStatusType.vacation:
        return  {
            bg: "#F1DFD9",
            icon:"#F0B59D",
            outline:"#EF9B78",
            icon_name: "beach_access"
        }
      case DailyStatusType.sickness:
        return  {
            bg: "#F4D4D9",
            icon:"#F9969E",
            outline:"#FD747D",
            icon_name: "sentiment_very_dissatisfied"
        }
      case DailyStatusType.absence:
        return  {
            bg: "#D2D7DC",
            icon:"#4c57636c",
            outline:"#5E6A73",
            icon_name: "event_busy"
        }
      case DailyStatusType.napping:
        return  {
            bg: "#F3ECD9",
            icon:"#F6DD98",
            outline:"#F8D570",
            icon_name: "nights_stay"
        }
      case DailyStatusType.kid_sick:
        return  {
            bg: "#F4D4D9",
            icon:"#F9969E",
            outline:"#FD747D",
            icon_name: "sentiment_stressed"
        }
      case DailyStatusType.other_department:
        return  {
            bg: "#ffffff",
            icon:"#ffffff",
            outline:"#ffffff",
            icon_name: "location_on"
        }
    }



    return {
        bg: "",
        icon:"",
        outline:""
    } as colorDailyStatus
}

