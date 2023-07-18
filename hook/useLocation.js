import { useCallback, useEffect, useState, useMemo } from "react";

export function useLocation(idCity = 0, idDistrict = 0, idWard = 0) {
  const [addressCity, setIdAddressCity] = useState();
  const [city, setCity] = useState();
  const [addressDistrict, setAddressDistrict] = useState();
  const [district, setDistrict] = useState();
  const [addressWard, setAddressWard] = useState();
  const [ward, setWard] = useState();
  useEffect(() => {
    async function ciyCode() {
      const city = await import("./../components/locations/cities.json").then(data => setCity(data.data));
      //   const name = city.data
    }
    ciyCode();
  }, []);
  const getAddressCity = useCallback(() => {
    if (city?.length > 0) {
      const address = city.find(item => item.id === idCity)
      // console.log(address)
      setIdAddressCity(address?.name)
    }
  }, [city, idCity])
  useEffect(() => {
    getAddressCity()
  }, [getAddressCity])

  useEffect(() => {
    async function districtCode() {
      if (!idCity) return
      const district = await import(
        `./../components/locations/districts/${idCity}.json`
      );
      setDistrict(district.data);
    }
    districtCode();
  }, [idCity, idDistrict]);
  const getAddressDistrict = useCallback(() => {
    if (district?.length > 0) {
      const addressDistrict = district.find(item => item.id === idDistrict)
      setAddressDistrict(addressDistrict?.name)
    }
  }, [district, idDistrict])
  useEffect(() => {
    getAddressDistrict()
  }, [getAddressDistrict])


  useEffect(() => {
    async function wardCodeCode() {
      if (!idDistrict) return
      const ward = await import(
        `./../components/locations/wards/${idDistrict}.json`
      );
      setWard(ward.data);
    }
    wardCodeCode();
  }, [idDistrict])

  const getAddressWard = useCallback(() => {
    if (ward?.length > 0) {
      const addressWard = ward.find(item => item.id === idWard)
      setAddressWard(addressWard?.name)
    }
  }, [idWard, ward])
  useEffect(() => {
    getAddressWard()
  }, [getAddressWard])

  return {
    addressCity, addressDistrict, addressWard
  }
}