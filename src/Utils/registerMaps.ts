import * as echarts from 'echarts';
import brasil from '../assets/brazil_geo.json';

let loaded = false;

export function registerMaps() {
    if (loaded) return;

    echarts.registerMap('Brasil', brasil as any);
    loaded = true;
}