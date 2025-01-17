import { Component, Input, OnInit } from '@angular/core';
import { getColorByDailyStatus } from 'src/app/helpers/colorByDailyStatus';
import { DailyStatusType } from 'src/app/services/supabase/entity';

@Component({
  selector: 'app-icon-status-types',
  templateUrl: './icon-status-types.component.html',
  styleUrls: ['./icon-status-types.component.scss'],
})
export class IconStatusTypesComponent  implements OnInit {
  @Input() statusType: DailyStatusType = DailyStatusType.check_in_out;
  @Input() shape: 'circle'|'none'= 'none'
  @Input() size: 'small'|'medium'|'large' = 'medium'
  icon_name:string ="check";
  backgroundColor: string  = '#FF0000';
  borderColor: string  = '#FF0000';

  constructor() { }

  ngOnInit() {
    this.backgroundColor = getColorByDailyStatus(this.statusType).icon;
    this.borderColor = getColorByDailyStatus(this.statusType).outline;
    this.icon_name = getColorByDailyStatus(this.statusType).icon_name;
  }

}
