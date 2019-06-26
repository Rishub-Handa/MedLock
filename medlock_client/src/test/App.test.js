import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';

describe('App.js Tests', () => {

    it('renders without crashing', () => {
        shallow(<App />);
    });

    it('mounts without crashing', () => {
        mount(<App />);
    });

});