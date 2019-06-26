import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../components/dashboard/Dashboard';

describe('Dashboard.js Tests', () => {
    
    it('renders without crashing', () => {
        shallow(<Dashboard />);
    })

    it('mounts without crashing', () => {
        mount(<Dashboard />);
    })
});