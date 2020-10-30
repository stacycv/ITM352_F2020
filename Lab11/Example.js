    thisYear = 1900;
    retirementTarget = 2035
    retirementYear = yearsToRetire(retirementTarget);

    console.log ( "I am going to retire in " + retirementYear + " years");

    function yearsToRetire (retireYear){
        thisYear = 2020; // over rides everything outside unless commented out
        return retireYear - thisYear;
    }

    console.log();

    