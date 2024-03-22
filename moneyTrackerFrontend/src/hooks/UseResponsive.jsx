import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

const UseResponsive = (query,key,start,end) => {
    const theme = useTheme()

    const mediaUp = useMediaQuery(theme.breakpoints.up(key))
    const mediadown = useMediaQuery(theme.breakpoints.down(key))
    const mediaBetween = useMediaQuery(theme.breakpoints.between(start,end))
    const mediaOnly = useMediaQuery(theme.breakpoints.only(key))

    if (query === "up"){
        return mediaUp;
    }
    else if (query === "down"){
        return mediadown;
    }
    else if(query === "between"){
        return mediaBetween;
    }
    else if(query === "only"){
        return mediaOnly;
    }

   return null;
}

export default UseResponsive