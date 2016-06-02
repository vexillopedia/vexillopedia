"use strict"

const express = require("express")
const router = express.Router()

// Data
const countries = require("./../data/countries.json")
const unrecognizedStates = require("./../data/unrecognized-states.json")
const internationalOrganizations = require("./../data/international-organizations.json")
const dependentTerritories = require("./../data/dependent-territories.json")
const countrySubdivisions = require("./../data/country-subdivisions.json")
const cities = require("./../data/cities.json")

const allFlags = [].concat(
    countries, 
    unrecognizedStates, 
    internationalOrganizations,
    dependentTerritories,
    countrySubdivisions,
    cities
)

// Categories API
router.get("/categories", (req, res) => {
    res.json(allFlags
        .reduce((categories, flag) => {
            if (categories.indexOf(flag.category) === -1)
                categories.push(flag.category)

            return categories
        }, [])
        .sort()
    )
})
router.get("/category/:category", (req, res) => {
    switch (req.params.category) {
        case "Countries":
            res.json(countries
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Unrecognized States":
            res.json(unrecognizedStates
                .map(flag => flag.name)
                .sort()
            )
            break
        case "International Organizations":
            res.json(internationalOrganizations
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Dependent Territories":
            res.json(dependentTerritories
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Country Subdivisions":
            res.json(countrySubdivisions
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Cities":
            res.json(cities
                .map(flag => flag.name)
                .sort()
            )
            break
        default:
            res.status(404).send({error: "Category not found."})
    }
})

// Flag API
router.get("/flags", (req, res) => {
    res.json(allFlags
        .map(flag => flag.name)
        .sort()
    )
})
router.get("/flag/:flag", (req, res) => {
    res.json(allFlags
        .find(flag => flag.name === req.params.flag)
    )
})

module.exports = router