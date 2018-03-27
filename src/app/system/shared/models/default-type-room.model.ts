export class DefaultTypeRoom {
  constructor(
    public typeRoomName?: string,
    public typeRoomWorldName?: string,
    public existLivingRoom?: boolean,
    public existSleepingRoom?: boolean,
    public existCabinet?: boolean,
    public existMeetingRoom?: boolean,
    public existShowingRoom?: boolean,
    public existBathRoom?: boolean,
    public existTV?: boolean,
    public existBar?: boolean,
    public existWiFi?: boolean,
    public existBalcony?: boolean,
    public existKitchen?: boolean,
    public existDiningRoom?: boolean,
    public existWCRoom?: boolean,
    public existAdditionalWCRoom?: boolean,
    public countOfMan?: number,
    public typeOfMainBed?: string,
    public existChildBed?: boolean,
    public id?: string,
    public isVisible?: boolean
  ) {}

}
