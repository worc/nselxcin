--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-24 01:02:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "nselxcin-test";
--
-- TOC entry 2988 (class 1262 OID 32768)
-- Name: nselxcin-test; Type: DATABASE; Schema: -; Owner: nselxcin
--

CREATE DATABASE "nselxcin-test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE "nselxcin-test" OWNER TO nselxcin;

\connect -reuse-previous=on "dbname='nselxcin-test'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 32773)
-- Name: workbooks; Type: TABLE; Schema: public; Owner: nselxcin
--

CREATE TABLE public.workbooks (
    workbook_id integer NOT NULL,
    title text,
    subtitle text,
    authors text,
    edition text,
    version text
);


ALTER TABLE public.workbooks OWNER TO nselxcin;

--
-- TOC entry 200 (class 1259 OID 32771)
-- Name: workbooks_workbook_id_seq; Type: SEQUENCE; Schema: public; Owner: nselxcin
--

ALTER TABLE public.workbooks ALTER COLUMN workbook_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.workbooks_workbook_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2982 (class 0 OID 32773)
-- Dependencies: 201
-- Data for Name: workbooks; Type: TABLE DATA; Schema: public; Owner: nselxcin
--

COPY public.workbooks (workbook_id, title, subtitle, authors, edition, version) FROM stdin;
14	Nselxcin 1	A Beginning Course in Colville-Okanagan Salish	Sarah Peterson, LaRae Wiley, Christopher Parkin	3rd	3
15	čaptíkʷł 1	N̓səl̓xčin̓ Stories for Beginners	Sarah Peterson, LaRae Wiley, Christopher Parkin	2nd	3
16	N̓səl̓xčin̓ 2	A Intermediate Course in Colville-Okanagan Salish	Sarah Peterson, LaRae Wiley, Christopher Parkin	2nd	4
17	Čaptíkʷł	Intermediate N̓səl̓xčin̓ Stories	Sarah Peterson, LaRae Wiley, Christopher Parkin	2nd	5
18	N̓səl̓xčin̓ 3	An Advanced Course in Colville-Okanagan Salish	Sarah Peterson, LaRae Wiley, Christopher Parkin	2nd	2
19	Čaptíkʷł 3	Advanced N̓səl̓xčin̓ Stories	Sarah Peterson, Christopher Parkin	1st	1
\.


--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 200
-- Name: workbooks_workbook_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nselxcin
--

SELECT pg_catalog.setval('public.workbooks_workbook_id_seq', 19, true);


-- Completed on 2021-01-24 01:02:58

--
-- PostgreSQL database dump complete
--

