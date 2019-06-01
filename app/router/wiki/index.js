const express = require('express');
const router = require('express-promise-router')();
const Vehicle = require('../../models/wiki/vehicle');
const Family = require('../../models/wiki/family');
const Brand = require('../../models/wiki/brand');
const Discipline = require('../../models/wiki/discipline');

var Mongoose = require('mongoose');

router.use('/brands', async (req, res, next) => {
	Brand.find().select('-__v').then((brands, err) => {
		if(err) return console.error(err);
		res.json(brands);
	});
});

router.use('/vehicles', async (req, res, next) => {

	Vehicle.find()
	.select('-__v')
	.populate({ path : 'brand', select : '-__v'})
	.populate({ path : 'discipline', populate : { path: 'family', select : '-__v' }, select : '-__v'})
	.then((vehicles, err) => {
		if(err) return console.error(err);
		res.json(vehicles);
	});

	/* TO REMOVE Merge req from LiveDB to TCEWIKI DB */
	/*
	const { Client } = require('pg')
	const client = new Client({
		user: 'celian',
		host: 'somewhere',
		database: 'livebot',
		password: 'lolnop'	
	})
	client.connect();
	*/
	//Need to be runned part by part

	/* Brands */
	
	/*const PSQLBrands = await client.query('SELECT DISTINCT brand from vehicle_list');
	

	/* Vehicles */
	/*
	const PSQLBrands = await client.query('SELECT * from vehicle_list');
	PSQLBrands.rows.forEach((entry)=>{
		Brand.findOne({ 'name' : entry.brand }, async function(err, brand) {
			const PSQLDiscipline = await client.query('SELECT discipline_name FROM discipline_list WHERE id_discipline = '+entry.discipline);
			Discipline.findOne({'name' : PSQLDiscipline.rows[0].discipline_name}, function(err, discipline) {
				var toto = new Vehicle({ 'model': entry.model, 
				'brand': Mongoose.Types.ObjectId(brand._id),
				'discipline' : Mongoose.Types.ObjectId(discipline._id),
				'year' : entry.year,
				'type' : entry.type
				}).save();
			});
			
		});
		
	});*/

	//const res = await client.query('select brand, model, year, type, dl.discipline_name from vehicle_list vl inner join discipline_list dl on vl.discipline=dl.id_discipline;');
	//console.log(res.rows[0].message) // Hello world!
	//await client.end()

		//var toto = new Discipline({"name":"Hovercraft", "family":Mongoose.Types.ObjectId("5ce903763c796e14c8d41dcf")}).save();

});

module.exports = router;