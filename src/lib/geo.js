const R = 6378.137; // Radius of earth in KM

export const degreesToRadians = (degrees) => {return (degrees * Math.PI)/180;}

export const latLngDist = (lat1, lon1, lat2, lon2) => {
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
};

export const meterPerLatLng = (lat, lng) => {
    lat *= 0.0174532925;
    lng *= 0.0174532925;
    return [
        111132.954 - 559.822 * Math.cos(2 * lng) + 1.175 * Math.cos(4 * lng),
        111132.954 * Math.cos(lat)
    ];
};

export const bearing = (lat1, lng1, lat2, lng2) => {
    var dLon = lng2 - lng1;
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    var brng = toDeg(Math.atan2(y, x));
    return 360 - ((brng + 360) % 360);
};

export const toDeg = rad => (rad * 180) / Math.PI;
export const toRad = deg => (deg * Math.PI) / 180;

export const distance = (location1, location2) => {
    const radius = 6371; // Earth's radius in kilometers
    const latDelta = degreesToRadians(location2.latitude - location1.latitude);
    const lonDelta = degreesToRadians(location2.longitude - location1.longitude);
  
    const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
            (Math.cos(degreesToRadians(location1.latitude)) * Math.cos(degreesToRadians(location2.latitude)) *
            Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return radius * c;
  }

export const boundingBoxCoordinates = (center, radius) => {
    const KM_PER_DEGREE_LATITUDE = 110.574;
    const latDegrees = radius / KM_PER_DEGREE_LATITUDE;
    const latitudeNorth = Math.min(90, center.latitude + latDegrees);
    const latitudeSouth = Math.max(-90, center.latitude - latDegrees);
    // calculate longitude based on current latitude
    const longDegsNorth = metersToLongitudeDegrees(radius, latitudeNorth);
    const longDegsSouth = metersToLongitudeDegrees(radius, latitudeSouth);
    const longDegs = Math.max(longDegsNorth, longDegsSouth);
    return {
        swCorner: { // bottom-left (SW corner)
            latitude: latitudeSouth,
            longitude: wrapLongitude(center.longitude - longDegs),
        },
        neCorner: { // top-right (NE corner)
            latitude: latitudeNorth,
            longitude: wrapLongitude(center.longitude + longDegs),
        },
    };
}
const metersToLongitudeDegrees = (distance, latitude) => {
    const EARTH_EQ_RADIUS = 6378137.0;
    // this is a super, fancy magic number that the GeoFire lib can explain (maybe)
    const E2 = 0.00669447819799;
    const EPSILON = 1e-12;
    const radians = degreesToRadians(latitude);
    const num = Math.cos(radians) * EARTH_EQ_RADIUS * Math.PI / 180;
    const denom = 1 / Math.sqrt(1 - E2 * Math.sin(radians) * Math.sin(radians));
    const deltaDeg = num * denom;
    if (deltaDeg < EPSILON) {
        return distance > 0 ? 360 : 0;
    }
    // else
    return Math.min(360, distance / deltaDeg);
}

/**
 * Wraps the longitude to [-180,180].
 *
 * @param {number} longitude The longitude to wrap.
 * @return {number} longitude The resulting longitude.
 */
export const wrapLongitude = (longitude) => {
    if (longitude <= 180 && longitude >= -180) {
        return longitude;
    }
    const adjusted = longitude + 180;
    if (adjusted > 0) {
        return (adjusted % 360) - 180;
    }
    // else
    return 180 - (-adjusted % 360);
}

