


export function getIconNameByLogAction(logAction: string):string {
    switch (logAction) {
        case 'napping':
            return 'nights_stay'
        case 'note':
            return 'sticky_note_2'
        case 'check_in_out':
            return 'check'
        case 'vacation':
            return 'beach_access'
        case 'sickness':
            return 'sentiment_very_dissatisfied'
        case 'absence':
            return 'event_busy'
        default:
            return 'check'
    }
}