import { ViewColumn, ViewEntity } from 'typeorm';
import { ISetting } from './setting.interface';

@ViewEntity({
  materialized: true,
  expression: `SELECT id, key, value
	FROM setting`,
})
export class SettingView implements Pick<ISetting, 'id' | 'key' | 'value'> {
  @ViewColumn()
  id: string;

  @ViewColumn()
  key: string;

  @ViewColumn()
  value: any;
}
