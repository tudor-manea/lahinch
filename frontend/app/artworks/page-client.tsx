"use client"

import { useEffect } from "react"

export default function ArtworksClient() {
  useEffect(() => {
    const priceFilterButton = document.getElementById("price-filter-button")
    const priceFilterPanel = document.getElementById("price-filter")

    if (priceFilterButton && priceFilterPanel) {
      priceFilterButton.addEventListener("click", () => {
        priceFilterPanel.classList.toggle("hidden")
      })
    }

    return () => {
      if (priceFilterButton) {
        priceFilterButton.removeEventListener("click", () => {
          priceFilterPanel?.classList.toggle("hidden")
        })
      }
    }
  }, [])

  return null
}
