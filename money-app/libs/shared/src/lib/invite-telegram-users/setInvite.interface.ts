export interface IInviteHrefInterface {
  /*
	ID клиента который заинвайтил
	*/
  clientId: string;

  /*
	ID группы в которую пользователя приглашают
	*/
  groupId: string;

  /*
	Номер телфона пользователя  +7999999999
	*/
  phone: string;

  /*
	Имя пользователя
	*/
  firstName: string;
}
