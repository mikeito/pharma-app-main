"use client"
import "mapbox-gl/dist/mapbox-gl.css";
import SearchForm from "./SearchForm";
import MapBox from "./MapBox";
import SearchCard from "./SearchCard";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { OrganisationState } from "src/redux/modules/organisations/organisationReducer";
import { selectOrganisations } from "src/redux/modules/organisations/organisationSelectors";
import { useEffect, useState } from "react";
import organisationActions from "src/redux/modules/organisations/organisationActions";
import { IDrug, IOrganisation } from "src/types";
import DrugSearchCard from "./DrugSearchCard";
import PrivateRoute from "src/provider/PrivateRoute";
import { useRouter } from "next/navigation";



const SearchPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [organisationResults, setOrganisationResults] = useState<IOrganisation[]>([]);
  const [drugResults, setDrugResults] = useState<IDrug[]>([]); 
  const [mapCoordinates, setMapCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);



  const organisations: typeof OrganisationState.organisations = useAppSelector(selectOrganisations);

  useEffect(() => {
    dispatch(organisationActions.getOrganizations());
  }, []);

  useEffect(() => {
    if (organisations?.data) {
      setOrganisationResults(organisations.data);
      updateMapCoordinates(organisations.data);

    }
  }, [organisations]);


  // const coordinates = organisations.data?.length > 0 ? organisations.data : markers?.map((result:any) => ({
  //   latitude: Number(result.latitude),
  //   longitude: Number(result.longitude),
  // }));

  const updateMapCoordinates = (items: IOrganisation[]) => {
    const coordinates = items.map((item) => ({
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
    }));
    setMapCoordinates(coordinates);
  };


  const handleSearch = (results: { data: IOrganisation[] | IDrug[]; item: string }) => {
    if (results.item === "organisation") {
      setOrganisationResults(results.data as IOrganisation[]);
      setDrugResults([]);
      updateMapCoordinates(results.data as IOrganisation[]); // Pass organisation data
    } else if (results.item === "drug") {
      const drugs = results.data as IDrug[];
      setDrugResults(drugs);
      setOrganisationResults([]);
  
      // Extract coordinates from the drugs' organisation property
      const drugCoordinates = drugs
        .map((drug) => drug.organisation)
        .filter((org): org is IOrganisation => !!org); // Type guard to ensure `organisation` exists
      updateMapCoordinates(drugCoordinates);
    }
  };
  



  return (
    <div className="flex h-screen w-full flex-col">
      {/* // header */}
      <div className="flex  min-h-12 w-full items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold cursor-pointer" onClick={()=> router.push('/search') }>Douala Pharmacy App</h1>
          <SearchForm  onSearch={handleSearch}  />
        </div>
        <div className="flex gap-2 justify-end items-center text-sm">
        <div className="cursor-pointer" onClick={()=> router.push('/admin') }>Go to Dashboard</div>
        <div className="cursor-pointer border rounded-sm border-red-500 p-1 " onClick={()=> router.push('/login') }>Logout</div>

        </div>
      </div>

      <div className="flex h-full overflow-y-hidden">
        <div className="flex-grow bg-slate-900">
        <MapBox coordinates={mapCoordinates} />
        </div>
        <div className="max-w-[500px]  overflow-y-auto flex-col gap-y-4 bg-blue-400 px-2">
        {organisationResults.length > 0 ? (
            organisationResults.map((organisation, index) => (
              <SearchCard key={index} organisation={organisation} />
            ))
          ) : drugResults.length > 0 ? (
            drugResults.map((drug, index) => (
              <DrugSearchCard key={index} drug={drug} />
            ))
          ) : (
            <p className="text-white p-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

