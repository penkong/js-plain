//
// it 's gatekeeper for Gmap
// instruction to every other class and how satisfy it.
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
}

export class GMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 2,
      center: {
        lat: 50,
        lng: 0
      }
    });
  }

  public addMarker(mappable: Mappable): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });
  }
}
