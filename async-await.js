
async doSomethingAsync () {
  
  // Run some stuff in parallel that we need up front
  const [one, two, three] = await Promise.all([parallelOne(), parallelTwo(), parallelThree()]);

  // Run some things async but in sequence with the above values
  const four = await asyncNeedingOne(one);
  const five = await asyncNeedingTwoAndThree(two, three);
}
