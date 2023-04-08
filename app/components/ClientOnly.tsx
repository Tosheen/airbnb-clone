"use client"

import * as React from "react"

type ClientOnlyProps = {
  children: React.ReactNode
}

export const ClientOnly = (props: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if(!hasMounted) {
    return null
  }

  return <>{props.children}</>
}
