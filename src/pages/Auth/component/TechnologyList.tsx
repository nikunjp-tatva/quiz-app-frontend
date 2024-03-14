import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography'
import { FormInputDropdown } from '../../../common/form-component/FormInputDropdown';
import HelperText from '../../../common/HelperText';
import { getTechnologiesList } from '../../../services/technology.service';

export default function TechnologyList({ control, errors }: any) {
    const [technologiesList, setTechnologiesList] = useState<object[]>([]);

    const fetchTechnologyList = async () => {
        const response = await getTechnologiesList();
        setTechnologiesList(response.data);
    };

    useEffect(() => {
        fetchTechnologyList();
    }, [])

    return (
        <>
            <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="technologies"
                mb="5px"
                mt="25px"
            >
                Technologies
            </Typography>
            <FormInputDropdown name="technologies" control={control} values={technologiesList} />
            {errors.technologies && <HelperText isError={true} message={errors.technologies.message} />}
        </>
    )
}
