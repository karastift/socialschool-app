import { useEffect, useState } from "react";
import { schools } from '../data/schools.json';

export const useSchoolCompletion = (initialValue: string) => {
  const [school, setSchool] = useState(initialValue);

  useEffect(() => {
    if (school.length != 0) {
      for (let i = 0; i < schools.length; i++) {
        if (schools[i].toLowerCase().includes(school.toLowerCase())) {
          setSchool(schools[i]);
        }
      }
    } 
  }, [school]);

  return [school, setSchool] as const;
};

    // const schools = schoolData.schools;
    // useEffect(() => {
    //     if (school.length != 0) {
    //         for (let i = 0; i < schools.length; i++) {
    //             if (schools[i].toLowerCase().includes(school.toLowerCase())) {
    //                 setShowValue(schools[i]);
    //             }
    //         }
    //     }
    // }, [school])