PGDMP                         z            erp-project-clean    13.4    13.4 Q               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    27508    erp-project-clean    DATABASE     s   CREATE DATABASE "erp-project-clean" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
 #   DROP DATABASE "erp-project-clean";
                postgres    false            �            1259    27574    batches    TABLE     L  CREATE TABLE public.batches (
    batch_id integer NOT NULL,
    material_id integer NOT NULL,
    supplier_id integer NOT NULL,
    purchase_qty real NOT NULL,
    current_qty real NOT NULL,
    price_per_unit integer NOT NULL,
    purchase_price integer NOT NULL,
    purchase_date date NOT NULL,
    expiry_date date NOT NULL
);
    DROP TABLE public.batches;
       public         heap    postgres    false            �            1259    27572    batches_batch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.batches_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.batches_batch_id_seq;
       public          postgres    false    210                        0    0    batches_batch_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.batches_batch_id_seq OWNED BY public.batches.batch_id;
          public          postgres    false    209            �            1259    27519    business    TABLE     �   CREATE TABLE public.business (
    business_id integer NOT NULL,
    user_id character varying(21) NOT NULL,
    name character varying(30),
    address character varying(250)
);
    DROP TABLE public.business;
       public         heap    postgres    false            �            1259    27517    business_business_id_seq    SEQUENCE     �   CREATE SEQUENCE public.business_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.business_business_id_seq;
       public          postgres    false    202            !           0    0    business_business_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.business_business_id_seq OWNED BY public.business.business_id;
          public          postgres    false    201            �            1259    27540    material    TABLE     �   CREATE TABLE public.material (
    material_id integer NOT NULL,
    business_id integer NOT NULL,
    measurement_id integer NOT NULL,
    name character varying NOT NULL,
    safety_stock_qty real
);
    DROP TABLE public.material;
       public         heap    postgres    false            �            1259    27538    material_material_id_seq    SEQUENCE     �   CREATE SEQUENCE public.material_material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.material_material_id_seq;
       public          postgres    false    206            "           0    0    material_material_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.material_material_id_seq OWNED BY public.material.material_id;
          public          postgres    false    205            �            1259    27532    measurement    TABLE     r   CREATE TABLE public.measurement (
    measurement_id integer NOT NULL,
    name character varying(10) NOT NULL
);
    DROP TABLE public.measurement;
       public         heap    postgres    false            �            1259    27530    measurement_measurement_id_seq    SEQUENCE     �   CREATE SEQUENCE public.measurement_measurement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.measurement_measurement_id_seq;
       public          postgres    false    204            #           0    0    measurement_measurement_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.measurement_measurement_id_seq OWNED BY public.measurement.measurement_id;
          public          postgres    false    203            �            1259    27637    order    TABLE        CREATE TABLE public."order" (
    order_id integer NOT NULL,
    business_id integer NOT NULL,
    order_date date NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false            �            1259    27635    order_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_order_id_seq;
       public          postgres    false    217            $           0    0    order_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.order_order_id_seq OWNED BY public."order".order_id;
          public          postgres    false    216            �            1259    27648    order_product    TABLE     �   CREATE TABLE public.order_product (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    qty integer NOT NULL
);
 !   DROP TABLE public.order_product;
       public         heap    postgres    false            �            1259    27592    product    TABLE     �   CREATE TABLE public.product (
    product_id integer NOT NULL,
    business_id integer NOT NULL,
    name character varying NOT NULL,
    price real NOT NULL,
    production_process character varying
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    27628    product_batches    TABLE     �   CREATE TABLE public.product_batches (
    product_batch_id integer NOT NULL,
    product_id integer NOT NULL,
    production_date date NOT NULL,
    expiry_date date NOT NULL,
    qty integer NOT NULL,
    status character varying NOT NULL
);
 #   DROP TABLE public.product_batches;
       public         heap    postgres    false            �            1259    27626 $   product_batches_product_batch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_batches_product_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.product_batches_product_batch_id_seq;
       public          postgres    false    215            %           0    0 $   product_batches_product_batch_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.product_batches_product_batch_id_seq OWNED BY public.product_batches.product_batch_id;
          public          postgres    false    214            �            1259    27606    product_material    TABLE     �   CREATE TABLE public.product_material (
    product_id integer NOT NULL,
    material_id integer NOT NULL,
    measurement_id integer NOT NULL,
    qty real NOT NULL
);
 $   DROP TABLE public.product_material;
       public         heap    postgres    false            �            1259    27590    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    212            &           0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    211            �            1259    27561    supplier    TABLE     �   CREATE TABLE public.supplier (
    supplier_id integer NOT NULL,
    business_id integer NOT NULL,
    name character varying(30) NOT NULL,
    address character varying(250),
    telp character varying(13)
);
    DROP TABLE public.supplier;
       public         heap    postgres    false            �            1259    27559    supplier_supplier_id_seq    SEQUENCE     �   CREATE SEQUENCE public.supplier_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.supplier_supplier_id_seq;
       public          postgres    false    208            '           0    0    supplier_supplier_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.supplier_supplier_id_seq OWNED BY public.supplier.supplier_id;
          public          postgres    false    207            �            1259    27509    users    TABLE     �   CREATE TABLE public.users (
    user_id character varying(21) NOT NULL,
    email character varying NOT NULL,
    firstname character varying(30) NOT NULL,
    lastname character varying(30) NOT NULL,
    profile_picture character varying(200)
);
    DROP TABLE public.users;
       public         heap    postgres    false            `           2604    27577    batches batch_id    DEFAULT     t   ALTER TABLE ONLY public.batches ALTER COLUMN batch_id SET DEFAULT nextval('public.batches_batch_id_seq'::regclass);
 ?   ALTER TABLE public.batches ALTER COLUMN batch_id DROP DEFAULT;
       public          postgres    false    210    209    210            \           2604    27522    business business_id    DEFAULT     |   ALTER TABLE ONLY public.business ALTER COLUMN business_id SET DEFAULT nextval('public.business_business_id_seq'::regclass);
 C   ALTER TABLE public.business ALTER COLUMN business_id DROP DEFAULT;
       public          postgres    false    201    202    202            ^           2604    27543    material material_id    DEFAULT     |   ALTER TABLE ONLY public.material ALTER COLUMN material_id SET DEFAULT nextval('public.material_material_id_seq'::regclass);
 C   ALTER TABLE public.material ALTER COLUMN material_id DROP DEFAULT;
       public          postgres    false    205    206    206            ]           2604    27535    measurement measurement_id    DEFAULT     �   ALTER TABLE ONLY public.measurement ALTER COLUMN measurement_id SET DEFAULT nextval('public.measurement_measurement_id_seq'::regclass);
 I   ALTER TABLE public.measurement ALTER COLUMN measurement_id DROP DEFAULT;
       public          postgres    false    203    204    204            c           2604    27640    order order_id    DEFAULT     r   ALTER TABLE ONLY public."order" ALTER COLUMN order_id SET DEFAULT nextval('public.order_order_id_seq'::regclass);
 ?   ALTER TABLE public."order" ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    216    217    217            a           2604    27595    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    211    212    212            b           2604    27631     product_batches product_batch_id    DEFAULT     �   ALTER TABLE ONLY public.product_batches ALTER COLUMN product_batch_id SET DEFAULT nextval('public.product_batches_product_batch_id_seq'::regclass);
 O   ALTER TABLE public.product_batches ALTER COLUMN product_batch_id DROP DEFAULT;
       public          postgres    false    215    214    215            _           2604    27564    supplier supplier_id    DEFAULT     |   ALTER TABLE ONLY public.supplier ALTER COLUMN supplier_id SET DEFAULT nextval('public.supplier_supplier_id_seq'::regclass);
 C   ALTER TABLE public.supplier ALTER COLUMN supplier_id DROP DEFAULT;
       public          postgres    false    208    207    208                      0    27574    batches 
   TABLE DATA           �   COPY public.batches (batch_id, material_id, supplier_id, purchase_qty, current_qty, price_per_unit, purchase_price, purchase_date, expiry_date) FROM stdin;
    public          postgres    false    210   Ta       	          0    27519    business 
   TABLE DATA           G   COPY public.business (business_id, user_id, name, address) FROM stdin;
    public          postgres    false    202   qa                 0    27540    material 
   TABLE DATA           d   COPY public.material (material_id, business_id, measurement_id, name, safety_stock_qty) FROM stdin;
    public          postgres    false    206   �a                 0    27532    measurement 
   TABLE DATA           ;   COPY public.measurement (measurement_id, name) FROM stdin;
    public          postgres    false    204   �a                 0    27637    order 
   TABLE DATA           D   COPY public."order" (order_id, business_id, order_date) FROM stdin;
    public          postgres    false    217   �a                 0    27648    order_product 
   TABLE DATA           B   COPY public.order_product (order_id, product_id, qty) FROM stdin;
    public          postgres    false    218   �a                 0    27592    product 
   TABLE DATA           [   COPY public.product (product_id, business_id, name, price, production_process) FROM stdin;
    public          postgres    false    212   b                 0    27628    product_batches 
   TABLE DATA           r   COPY public.product_batches (product_batch_id, product_id, production_date, expiry_date, qty, status) FROM stdin;
    public          postgres    false    215   2b                 0    27606    product_material 
   TABLE DATA           X   COPY public.product_material (product_id, material_id, measurement_id, qty) FROM stdin;
    public          postgres    false    213   Ob                 0    27561    supplier 
   TABLE DATA           Q   COPY public.supplier (supplier_id, business_id, name, address, telp) FROM stdin;
    public          postgres    false    208   lb                 0    27509    users 
   TABLE DATA           U   COPY public.users (user_id, email, firstname, lastname, profile_picture) FROM stdin;
    public          postgres    false    200   �b       (           0    0    batches_batch_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.batches_batch_id_seq', 1, false);
          public          postgres    false    209            )           0    0    business_business_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.business_business_id_seq', 1, false);
          public          postgres    false    201            *           0    0    material_material_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.material_material_id_seq', 1, false);
          public          postgres    false    205            +           0    0    measurement_measurement_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.measurement_measurement_id_seq', 4, true);
          public          postgres    false    203            ,           0    0    order_order_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_order_id_seq', 1, false);
          public          postgres    false    216            -           0    0 $   product_batches_product_batch_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.product_batches_product_batch_id_seq', 1, false);
          public          postgres    false    214            .           0    0    product_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_product_id_seq', 1, false);
          public          postgres    false    211            /           0    0    supplier_supplier_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.supplier_supplier_id_seq', 1, false);
          public          postgres    false    207            o           2606    27579    batches batches_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (batch_id);
 >   ALTER TABLE ONLY public.batches DROP CONSTRAINT batches_pkey;
       public            postgres    false    210            g           2606    27524    business business_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pkey PRIMARY KEY (business_id);
 @   ALTER TABLE ONLY public.business DROP CONSTRAINT business_pkey;
       public            postgres    false    202            k           2606    27548    material material_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (material_id);
 @   ALTER TABLE ONLY public.material DROP CONSTRAINT material_pkey;
       public            postgres    false    206            i           2606    27537    measurement measurement_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT measurement_pkey PRIMARY KEY (measurement_id);
 F   ALTER TABLE ONLY public.measurement DROP CONSTRAINT measurement_pkey;
       public            postgres    false    204            u           2606    27642    order order_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public."order" DROP CONSTRAINT order_pkey;
       public            postgres    false    217            w           2606    27652     order_product order_product_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY (order_id, product_id);
 J   ALTER TABLE ONLY public.order_product DROP CONSTRAINT order_product_pkey;
       public            postgres    false    218    218            s           2606    27610 &   product_material product_material_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.product_material
    ADD CONSTRAINT product_material_pkey PRIMARY KEY (product_id, material_id);
 P   ALTER TABLE ONLY public.product_material DROP CONSTRAINT product_material_pkey;
       public            postgres    false    213    213            q           2606    27600    product product_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    212            m           2606    27566    supplier supplier_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id);
 @   ALTER TABLE ONLY public.supplier DROP CONSTRAINT supplier_pkey;
       public            postgres    false    208            e           2606    27516    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            y           2606    27549    material fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public.material
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 >   ALTER TABLE ONLY public.material DROP CONSTRAINT fk_business;
       public          postgres    false    2919    206    202            {           2606    27567    supplier fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 >   ALTER TABLE ONLY public.supplier DROP CONSTRAINT fk_business;
       public          postgres    false    208    2919    202            ~           2606    27601    product fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 =   ALTER TABLE ONLY public.product DROP CONSTRAINT fk_business;
       public          postgres    false    212    2919    202            �           2606    27643    order fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 =   ALTER TABLE ONLY public."order" DROP CONSTRAINT fk_business;
       public          postgres    false    202    2919    217            |           2606    27580    batches fk_material    FK CONSTRAINT     �   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT fk_material FOREIGN KEY (material_id) REFERENCES public.material(material_id);
 =   ALTER TABLE ONLY public.batches DROP CONSTRAINT fk_material;
       public          postgres    false    206    2923    210            �           2606    27616    product_material fk_material    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_material
    ADD CONSTRAINT fk_material FOREIGN KEY (material_id) REFERENCES public.material(material_id);
 F   ALTER TABLE ONLY public.product_material DROP CONSTRAINT fk_material;
       public          postgres    false    206    2923    213            z           2606    27554    material fk_measurement    FK CONSTRAINT     �   ALTER TABLE ONLY public.material
    ADD CONSTRAINT fk_measurement FOREIGN KEY (measurement_id) REFERENCES public.measurement(measurement_id);
 A   ALTER TABLE ONLY public.material DROP CONSTRAINT fk_measurement;
       public          postgres    false    2921    206    204            �           2606    27621    product_material fk_measurement    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_material
    ADD CONSTRAINT fk_measurement FOREIGN KEY (measurement_id) REFERENCES public.measurement(measurement_id);
 I   ALTER TABLE ONLY public.product_material DROP CONSTRAINT fk_measurement;
       public          postgres    false    204    2921    213            �           2606    27653    order_product fk_order    FK CONSTRAINT     ~   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public."order"(order_id);
 @   ALTER TABLE ONLY public.order_product DROP CONSTRAINT fk_order;
       public          postgres    false    2933    218    217                       2606    27611    product_material fk_product    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_material
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);
 E   ALTER TABLE ONLY public.product_material DROP CONSTRAINT fk_product;
       public          postgres    false    2929    213    212            �           2606    27658    order_product fk_product    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);
 B   ALTER TABLE ONLY public.order_product DROP CONSTRAINT fk_product;
       public          postgres    false    2929    218    212            }           2606    27585    batches fk_supplier    FK CONSTRAINT     �   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES public.supplier(supplier_id);
 =   ALTER TABLE ONLY public.batches DROP CONSTRAINT fk_supplier;
       public          postgres    false    208    2925    210            x           2606    27525    business fk_user    FK CONSTRAINT     t   ALTER TABLE ONLY public.business
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 :   ALTER TABLE ONLY public.business DROP CONSTRAINT fk_user;
       public          postgres    false    200    2917    202                  x������ � �      	      x������ � �            x������ � �             x�3��N�2�L/�2���2�������� =��            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     