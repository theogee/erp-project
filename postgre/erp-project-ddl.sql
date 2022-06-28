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

create table product (
	product_id serial primary key,
	business_id int not null,
	name varchar not null,
	price real not null,
	production_process varchar,
	constraint fk_business
		foreign key(business_id)
			references business(business_id)
);

create table product_material (
	product_id int not null,
	material_id int not null,
	measurement_id int not null,
	qty real not null,
	primary key (product_id, material_id),
	constraint fk_product
		foreign key(product_id)
			references product(product_id),
	constraint fk_material
		foreign key(material_id)
			references material(material_id),
	constraint fk_measurement
		foreign key(measurement_id)
			references measurement(measurement_id)
);

create table product_batches (
	product_batch_id serial primary key,
	product_id int not null,
	production_date date not null,
	expiry_date date not null,
	qty int not null,
	status varchar not null,
	constraint fk_product_id
		foreign key(product_id)
			references product(product_id) 
);

create table in_use_batch (
	product_batch_id int not null,
	material_batch_id int not null,
	qty real not null,
	primary key (product_batch_id, material_batch_id),
	constraint fk_product_batch_id
		foreign key(product_batch_id)
			references product_batches(product_batch_id),
	constraint fk_material_batch_id
		foreign key(material_batch_id)
			references batches(batch_id)
)

create table "order" (
	order_id serial primary key,
	business_id int not null,
	order_date date not null,
	client_name varchar,
	constraint fk_business
		foreign key(business_id)
			references business(business_id)
);

create table order_product (
	order_product_id serial primary key,
	order_id int not null,
	product_name varchar not null,
	product_price real not null,
	qty int not null,
	constraint fk_order
		foreign key(order_id)
			references "order"(order_id)
)
