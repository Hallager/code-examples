import { activityTypes } from "../services/supabase/entity";


export function getIconNameByActivityType(activityType: activityTypes):string {
    switch (activityType) {
        case activityTypes.scheduled_pick_up:
            return 'home'
        case activityTypes.check_out:
        case activityTypes.check_in:
            return 'check'
        case activityTypes.potty:
            return 'toilet'
        case activityTypes.sickness:
            return 'sentiment_very_dissatisfied'
        case activityTypes.note:
            return 'sticky_note_2'
        case activityTypes.nap:
            return ' nights_stay'  
      case activityTypes.vacation:
            return 'beach_access'
        case activityTypes.absence: 
            return 'event_busy'
        default:
            return 'check'
    }
}