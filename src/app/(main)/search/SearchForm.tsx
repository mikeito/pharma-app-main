"use client";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/base/Input";
import { Select as SelectInput } from "../../../components/base/select";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import organisationActions from "src/redux/modules/organisations/organisationActions";
import { useFormik } from 'formik';
import * as yup from 'yup';
import drugActions from "src/redux/modules/drugs/drugActions";
import { IDrug, IOrganisation } from "src/types";

interface FormProps {
  term: string;
  item: string;
  type: string;
}
const validationSchema = yup.object({
  term: yup.string().required('Required field'),
  item: yup.string().required('Required field'),
});

const items = [
  { label: "Drug", value: "drug" },
  { label: "Organisation", value: "organisation" },
];

const types = [
  { label: "PHARMACY", value: "pharmacy" },
  { label: "HOSPITAL", value: "hospital" },
  { label: "HEALTH CENTER", value: "healthcenter" },
];

export default function SearchForm({
  onSearch,
}: {
  onSearch: (results: { data: IOrganisation[] | IDrug[]; item: string }) => void; 
}) {
  const dispatch = useDispatch();

  const initialValues:FormProps = {
    term: "",
      item: "",
      type: "",
  };

  const handleSubmit = (data: FormProps) => {
    console.log(data);
    const { item, ...payload } = data;
    if(item === 'organisation'){
      dispatch(organisationActions.searchOrganisations(payload) as any)
        .then((response: any) => {
          if (response.payload) {
            onSearch({ data: response.payload.data, item: 'organisation' }); 
          }
        })
        .catch((error:any) => {
          console.error("Search error:", error);
          onSearch({ data: [], item: 'organisation' });
        }).finally(() => {
        });      
    }else if(item === 'drug'){
      dispatch(drugActions.searchDrugs(payload) as any).then((response:any) =>{
        if (response.payload) {
          onSearch({ data: response.payload.data, item: 'drug' }); 
          console.log(response.payload)
        }
      }).catch((error:any) => {
        console.error("Search error:", error);
        onSearch({ data: [], item: 'drug' });
      }).finally(() => {
      });   
    }
  };

  const formik = useFormik<FormProps>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { submitForm, values, errors, touched, handleBlur, handleChange } = formik;

  useEffect(() => {
    console.log("vals", values);
  }, [values]);
  const isOrganisation = values.item === "organisation";




  return (
    <div className="flex gap-2 items-center">
        <SelectInput
          options={items}
          placeholder="Select item to search"
          name='item'
          onValueChange={(value:any) => formik.setFieldValue("item", value)}
          error={touched.item && errors.item}
        />
        {isOrganisation && (
          <SelectInput
            name="type"
            options={types}
            onValueChange={(value:any) => formik.setFieldValue("type", value)}
            error={touched.type && errors.type}
            placeholder="Select an organisation type"
          />
        )}
        <Input
          name="term"
          type="default"
          onChange={handleChange}
          placeholder="Search term"
        />
        <Button onClick={submitForm} className="bg-purple-600 hover:bg-purple-500">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
     </div>
  );
}
