create table users (
	user_id varchar(21) not null primary key,
	email varchar not null,
	firstname varchar(30) not null,
	lastname varchar(30) not null,
	profile_picture varchar(200)
);

create table business (
	business_id serial primary key,
	user_id varchar(21) not null,
	name varchar(30),
	address varchar(250),
	constraint fk_user
		foreign key(user_id)
			references users(user_id)
);

create table measurement (
	measurement_id serial primary key,
	name varchar(10) not null
);

create table material (
	material_id serial primary key,
	business_id int not null,
	measurement_id int not null,
	name varchar not null,
	safety_stock_qty real,
	constraint fk_business
		foreign key(business_id)
			references business(business_id),
	constraint fk_measurement
		foreign key (measurement_id)
			references measurement(measurement_id)
);

create table supplier (
	supplier_id serial primary key,
	business_id int not null,
	name varchar(30) not null,
	address varchar(250),
	telp varchar(13),
	constraint fk_business
		foreign key(business_id)
			references business(business_id)
);

create table batches (
	batch_id serial primary key,
	material_id int not null,
	supplier_id int not null,
	purchase_qty real not null,
	current_qty real not null,
	price_per_unit int not null,
	purchase_price int not null,
	purchase_date date not null,
	expiry_date date not null,
	constraint fk_material
		foreign key (material_id)
			references material(material_id),
	constraint fk_supplier
		foreign key (supplier_id)
			references supplier(supplier_id)
);

