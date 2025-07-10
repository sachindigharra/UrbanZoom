import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { VehicleDetail } from './feature/vehicle/vehicle-detail/vehicle-detail';
import { AddVehicle } from './feature/vehicle/add-vehicle/add-vehicle';

export const routes: Routes = [
    {
        path:'home',
        component:Home,
    },
    {
        path:'vehicle/:id',
        component:VehicleDetail
    },
    {
        path:'add',
        component:AddVehicle
    },
    { 
        path: 'vehicle/edit/:id',
        component: AddVehicle
    },

];
