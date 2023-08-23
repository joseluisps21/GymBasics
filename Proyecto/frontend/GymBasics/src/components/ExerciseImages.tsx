// exerciseImages.js

import benchpress from '../static/images/benchpress.gif';


const exerciseImages: { [key: string]: string } = {
    benchpress: require(benchpress).default,
    // squat: require('../static/images/squat.gif').default,
    // Agrega más entradas según las imágenes que tengas
};

export default exerciseImages;
  