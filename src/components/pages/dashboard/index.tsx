'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { RecentSales } from './recent-sales';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { OrganisationState } from 'src/redux/modules/organisations/organisationReducer';
import { selectOrganisations } from 'src/redux/modules/organisations/organisationSelectors';
import { useEffect, useMemo } from 'react';
import organisationActions from 'src/redux/modules/organisations/organisationActions';
import { Hospital, Landmark, Store, Users, Warehouse } from 'lucide-react';
import { UserState } from 'src/redux/modules/users/userReducer';
import { selectUsers } from 'src/redux/modules/users/userSelector';
import userAction from 'src/redux/modules/users/userAction';
import  Overview  from './overview';

export default function Dashboard() {

  const dispatch = useAppDispatch();
  const organisations: typeof OrganisationState.organisations = useAppSelector(selectOrganisations);

  const users: typeof UserState.users = useAppSelector(selectUsers);
  useEffect(() => {
    dispatch(organisationActions.getOrganizations());
  }, []);


  useEffect(() => {
    dispatch(userAction.getUsers());
  }, []);
  console.log({users})

  const { hospitals, pharmacies, healthcenters } = useMemo(() => {
    return {
      hospitals: organisations.data.filter(org => org.type === 'HOSPITAL'),
      pharmacies: organisations.data.filter(org => org.type === 'PHARMACY'),
      healthcenters: organisations.data.filter(org => org.type === 'HEALTHCENTER'),
    };
  }, [organisations]);
  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Dashboard</h1>
       
      </div>
      <div className='space-y-4'>
            <div>Overview</div>
       
        <div  className='space-y-4'>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Hospitals</CardTitle>   
                <Hospital/>
          
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{hospitals?.length} <span className='text-sm font-normal text-gray-500 mx-2'>Hospital(s)</span></div>
                {/* <p className='text-xs text-muted-foreground'>60% are pharmacies</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Health Centers</CardTitle>
                <Landmark/>

              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{healthcenters?.length}<span className='text-sm font-normal text-gray-500 mx-2'>Health center(s)</span></div>
                {/* <p className='text-xs text-muted-foreground'>+180.1% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Pharmacies</CardTitle>
                <Store/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{pharmacies?.length}<span className='text-sm font-normal text-gray-500 mx-2'>Pharmacy(ies)</span></div>
                {/* <p className='text-xs text-muted-foreground'>+19% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Users</CardTitle>
                <Users/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{users?.data?.length} <span className='text-sm font-normal text-gray-500 mx-2'>User(s)</span></div>
                {/* <p className='text-xs text-muted-foreground'>+201 since last hour</p> */}
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4'>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview />
                </CardContent>
            </Card>
            <Card className='col-span-1 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
