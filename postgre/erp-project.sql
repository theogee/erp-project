PGDMP         /                z            erp-project-clean    13.4    13.4 0    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    26991    erp-project-clean    DATABASE     s   CREATE DATABASE "erp-project-clean" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
 #   DROP DATABASE "erp-project-clean";
                postgres    false            �            1259    27057    batches    TABLE     R  CREATE TABLE public.batches (
    batch_id integer NOT NULL,
    material_id integer NOT NULL,
    supplier_id integer NOT NULL,
    purchase_qty integer NOT NULL,
    current_qty integer NOT NULL,
    price_per_unit integer NOT NULL,
    purchase_price integer NOT NULL,
    purchase_date date NOT NULL,
    expiry_date date NOT NULL
);
    DROP TABLE public.batches;
       public         heap    postgres    false            �            1259    27055    batches_batch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.batches_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.batches_batch_id_seq;
       public          postgres    false    210            �           0    0    batches_batch_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.batches_batch_id_seq OWNED BY public.batches.batch_id;
          public          postgres    false    209            �            1259    27002    business    TABLE     �   CREATE TABLE public.business (
    business_id integer NOT NULL,
    user_id character varying(21) NOT NULL,
    name character varying(30),
    address character varying(250)
);
    DROP TABLE public.business;
       public         heap    postgres    false            �            1259    27000    business_business_id_seq    SEQUENCE     �   CREATE SEQUENCE public.business_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.business_business_id_seq;
       public          postgres    false    202            �           0    0    business_business_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.business_business_id_seq OWNED BY public.business.business_id;
          public          postgres    false    201            �            1259    27023    material    TABLE     �   CREATE TABLE public.material (
    material_id integer NOT NULL,
    business_id integer NOT NULL,
    measurement_id integer NOT NULL,
    name character varying NOT NULL,
    safety_stock_qty real
);
    DROP TABLE public.material;
       public         heap    postgres    false            �            1259    27021    material_material_id_seq    SEQUENCE     �   CREATE SEQUENCE public.material_material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.material_material_id_seq;
       public          postgres    false    206            �           0    0    material_material_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.material_material_id_seq OWNED BY public.material.material_id;
          public          postgres    false    205            �            1259    27015    measurement    TABLE     r   CREATE TABLE public.measurement (
    measurement_id integer NOT NULL,
    name character varying(10) NOT NULL
);
    DROP TABLE public.measurement;
       public         heap    postgres    false            �            1259    27013    measurement_measurement_id_seq    SEQUENCE     �   CREATE SEQUENCE public.measurement_measurement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.measurement_measurement_id_seq;
       public          postgres    false    204            �           0    0    measurement_measurement_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.measurement_measurement_id_seq OWNED BY public.measurement.measurement_id;
          public          postgres    false    203            �            1259    27044    supplier    TABLE     �   CREATE TABLE public.supplier (
    supplier_id integer NOT NULL,
    business_id integer NOT NULL,
    name character varying(30) NOT NULL,
    address character varying(250),
    telp character varying(13)
);
    DROP TABLE public.supplier;
       public         heap    postgres    false            �            1259    27042    supplier_supplier_id_seq    SEQUENCE     �   CREATE SEQUENCE public.supplier_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.supplier_supplier_id_seq;
       public          postgres    false    208            �           0    0    supplier_supplier_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.supplier_supplier_id_seq OWNED BY public.supplier.supplier_id;
          public          postgres    false    207            �            1259    26992    users    TABLE     �   CREATE TABLE public.users (
    user_id character varying(21) NOT NULL,
    email character varying NOT NULL,
    firstname character varying(30) NOT NULL,
    lastname character varying(30) NOT NULL,
    profile_picture character varying(200)
);
    DROP TABLE public.users;
       public         heap    postgres    false            D           2604    27060    batches batch_id    DEFAULT     t   ALTER TABLE ONLY public.batches ALTER COLUMN batch_id SET DEFAULT nextval('public.batches_batch_id_seq'::regclass);
 ?   ALTER TABLE public.batches ALTER COLUMN batch_id DROP DEFAULT;
       public          postgres    false    210    209    210            @           2604    27005    business business_id    DEFAULT     |   ALTER TABLE ONLY public.business ALTER COLUMN business_id SET DEFAULT nextval('public.business_business_id_seq'::regclass);
 C   ALTER TABLE public.business ALTER COLUMN business_id DROP DEFAULT;
       public          postgres    false    201    202    202            B           2604    27026    material material_id    DEFAULT     |   ALTER TABLE ONLY public.material ALTER COLUMN material_id SET DEFAULT nextval('public.material_material_id_seq'::regclass);
 C   ALTER TABLE public.material ALTER COLUMN material_id DROP DEFAULT;
       public          postgres    false    205    206    206            A           2604    27018    measurement measurement_id    DEFAULT     �   ALTER TABLE ONLY public.measurement ALTER COLUMN measurement_id SET DEFAULT nextval('public.measurement_measurement_id_seq'::regclass);
 I   ALTER TABLE public.measurement ALTER COLUMN measurement_id DROP DEFAULT;
       public          postgres    false    203    204    204            C           2604    27047    supplier supplier_id    DEFAULT     |   ALTER TABLE ONLY public.supplier ALTER COLUMN supplier_id SET DEFAULT nextval('public.supplier_supplier_id_seq'::regclass);
 C   ALTER TABLE public.supplier ALTER COLUMN supplier_id DROP DEFAULT;
       public          postgres    false    208    207    208            �          0    27057    batches 
   TABLE DATA           �   COPY public.batches (batch_id, material_id, supplier_id, purchase_qty, current_qty, price_per_unit, purchase_price, purchase_date, expiry_date) FROM stdin;
    public          postgres    false    210   �8       �          0    27002    business 
   TABLE DATA           G   COPY public.business (business_id, user_id, name, address) FROM stdin;
    public          postgres    false    202   �8       �          0    27023    material 
   TABLE DATA           d   COPY public.material (material_id, business_id, measurement_id, name, safety_stock_qty) FROM stdin;
    public          postgres    false    206   �8       �          0    27015    measurement 
   TABLE DATA           ;   COPY public.measurement (measurement_id, name) FROM stdin;
    public          postgres    false    204   �8       �          0    27044    supplier 
   TABLE DATA           Q   COPY public.supplier (supplier_id, business_id, name, address, telp) FROM stdin;
    public          postgres    false    208   9       �          0    26992    users 
   TABLE DATA           U   COPY public.users (user_id, email, firstname, lastname, profile_picture) FROM stdin;
    public          postgres    false    200   9       �           0    0    batches_batch_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.batches_batch_id_seq', 1, false);
          public          postgres    false    209            �           0    0    business_business_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.business_business_id_seq', 1, false);
          public          postgres    false    201            �           0    0    material_material_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.material_material_id_seq', 1, false);
          public          postgres    false    205            �           0    0    measurement_measurement_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.measurement_measurement_id_seq', 1, false);
          public          postgres    false    203            �           0    0    supplier_supplier_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.supplier_supplier_id_seq', 1, false);
          public          postgres    false    207            P           2606    27062    batches batches_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (batch_id);
 >   ALTER TABLE ONLY public.batches DROP CONSTRAINT batches_pkey;
       public            postgres    false    210            H           2606    27007    business business_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pkey PRIMARY KEY (business_id);
 @   ALTER TABLE ONLY public.business DROP CONSTRAINT business_pkey;
       public            postgres    false    202            L           2606    27031    material material_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (material_id);
 @   ALTER TABLE ONLY public.material DROP CONSTRAINT material_pkey;
       public            postgres    false    206            J           2606    27020    measurement measurement_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT measurement_pkey PRIMARY KEY (measurement_id);
 F   ALTER TABLE ONLY public.measurement DROP CONSTRAINT measurement_pkey;
       public            postgres    false    204            N           2606    27049    supplier supplier_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id);
 @   ALTER TABLE ONLY public.supplier DROP CONSTRAINT supplier_pkey;
       public            postgres    false    208            F           2606    26999    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            R           2606    27032    material fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public.material
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 >   ALTER TABLE ONLY public.material DROP CONSTRAINT fk_business;
       public          postgres    false    202    2888    206            T           2606    27050    supplier fk_business    FK CONSTRAINT     �   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.business(business_id);
 >   ALTER TABLE ONLY public.supplier DROP CONSTRAINT fk_business;
       public          postgres    false    208    202    2888            U           2606    27063    batches fk_material    FK CONSTRAINT     �   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT fk_material FOREIGN KEY (material_id) REFERENCES public.material(material_id);
 =   ALTER TABLE ONLY public.batches DROP CONSTRAINT fk_material;
       public          postgres    false    210    2892    206            S           2606    27037    material fk_measurement    FK CONSTRAINT     �   ALTER TABLE ONLY public.material
    ADD CONSTRAINT fk_measurement FOREIGN KEY (measurement_id) REFERENCES public.measurement(measurement_id);
 A   ALTER TABLE ONLY public.material DROP CONSTRAINT fk_measurement;
       public          postgres    false    206    204    2890            V           2606    27068    batches fk_supplier    FK CONSTRAINT     �   ALTER TABLE ONLY public.batches
    ADD CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES public.supplier(supplier_id);
 =   ALTER TABLE ONLY public.batches DROP CONSTRAINT fk_supplier;
       public          postgres    false    208    2894    210            Q           2606    27008    business fk_user    FK CONSTRAINT     t   ALTER TABLE ONLY public.business
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 :   ALTER TABLE ONLY public.business DROP CONSTRAINT fk_user;
       public          postgres    false    200    2886    202            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     