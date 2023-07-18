import { useEffect, useState } from "react";

export const PATHS_LOCAL = {
    CITIES: "./locations/cities.json",
    DISTRICTS: "./locations/districts",
    WARDS: "./locations/wards",
    LOCATION: "./locations/location.json",
};

const FETCH_TYPES = {
    CITIES: "FETCH_CITIES",
    DISTRICTS: "FETCH_DISTRICTS",
    WARDS: "FETCH_WARDS",
};


async function fetchLocationOptions(fetchType, locationId) {
    // console.log(locationId)
    let url;
    switch (fetchType) {
        case FETCH_TYPES.CITIES: {
            url = './locations/cities.json';
            // console.log('url', url)
            break;
        }
        case FETCH_TYPES.DISTRICTS: {
            url = `${PATHS_LOCAL.DISTRICTS}/${locationId}.json`;
            // url = `./../components/${PATHS_LOCAL.DISTRICTS}/${locationId}.json`;
            break;
        }
        case FETCH_TYPES.WARDS: {
            url = `${PATHS_LOCAL.WARDS}/${locationId}.json`;
            // url = `./../components/${PATHS_LOCAL.WARDS}/${locationId}.json`;
            break;
        }
        default: {
            return [];
        }
    }
    const locations = await import(`${url}`);
    // console.log('locations', locations.data)
    return locations?.data?.map(({ id, name }) => ({ value: id, label: name }));
}

export async function getLocation(cityCode, districtCode, wardCode) {
    const [cities, districts, wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.CITIES),
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityCode ? cityCode : 0),
        fetchLocationOptions(FETCH_TYPES.WARDS, districtCode ? districtCode : 0),
    ]);
    return {
        city: cities.find((e) => e.value === cityCode)?.label,
        district: districts.find((e) => e.value === districtCode)?.label,
        ward: wards.find((e) => e.value === wardCode)?.label,
    };
}

async function fetchInitialData(userInformation = {}) {
    const { cityCode, districtCode, wardCode } = userInformation;
    const [cities, districts, wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.CITIES),
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityCode ? cityCode : 0),
        fetchLocationOptions(FETCH_TYPES.WARDS, districtCode ? districtCode : 0)
    ])

    return {
        cityOptions: cities,
        districtOptions: districts,
        wardOptions: wards,
        selectedCity: cities.find((c) => c.value === cityCode),
        selectedDistrict: districts.find((d) => d.value === districtCode),
        selectedWard: wards.find((w) => w.value === wardCode)
    }
}


function LocationVietNam(shouldFetchInitialLocation, userInformation) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null,
    });

    const { selectedCity, selectedDistrict } = state;

    useEffect(() => {
        (async function () {
            if (shouldFetchInitialLocation) {
                const initialData = await fetchInitialData(userInformation);
                setState(initialData);
            } else {
                const options = await fetchLocationOptions(FETCH_TYPES.CITIES);
                setState({ ...state, cityOptions: options });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInformation]);

    useEffect(() => {
        (async function () {
            if (!selectedCity) return;
            const options = await fetchLocationOptions(
                FETCH_TYPES.DISTRICTS,
                selectedCity.value
            );
            setState({ ...state, districtOptions: options });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity]);

    useEffect(() => {
        (async function () {
            if (!selectedDistrict) return;
            const options = await fetchLocationOptions(
                FETCH_TYPES.WARDS,
                selectedDistrict.value
            );
            setState({ ...state, wardOptions: options });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDistrict]);

    function onCitySelect(option) {
        setState({
            ...state,
            districtOptions: [],
            wardOptions: [],
            selectedCity: option,
            selectedDistrict: null,
            selectedWard: null,
        });
    }

    function onDistrictSelect(option) {
        setState({
            ...state,
            wardOptions: [],
            selectedDistrict: option,
            selectedWard: null,
        });
    }

    function onWardSelect(option) {
        setState({ ...state, selectedWard: option });
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect };
}

export default LocationVietNam;