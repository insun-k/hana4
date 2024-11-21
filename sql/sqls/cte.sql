-- 기본 CTE 예시 (p.80)
-- 각 부서별 평균 salary가 가장 높은 부서와 가장 낮은 부서를 구하고, 평균 급여 차액을 구하시오.
WITH
  AvgSal AS (
select d.id, d.dname, avg(e.salary) avgsal
	from Dept d inner join Emp e on d.id = e.dept
    group by d.id
),
  MaxAvgSal AS (
  select * from AvgSal order by avgsal desc limit 1
),
  MinAvgSal AS (
  select * from AvgSal order by avgsal limit 1
),
  SumUp AS (
  select '최고' as gb, mx.* from MaxAvgSal mx
  UNION ALL
  select '최저' as gb, mi.* from MinAvgSal mi
)

select gb, dname, format(avgsal * 10000, 0) from SumUp
UNION ALL
select '', '평균 급여 차액', format((max(avgsal) - min(avgsal)) * 10000 ,0) from Sumup;


-- 재귀 CTE 예제 (p.81)
-- 예제1) 피보나치 수열
WITH RECURSIVE fibonacci(n, fib_n, fib_next_n) AS (
	select 1, 0, 1
    UNION ALL
    select n + 1, fib_next_n, fib_n + fib_next_n
		from fibonacci where n < 10
) 
select * from fibonacci;

-- 예제2) 부서의 트리 계층 구조(hierarchy)를 표현하시오.
insert into Dept(pid, dname) values(6, '인프라셀');
insert into Dept(pid, dname) values(6, 'DB셀');
insert into Dept(pid, dname) values(7, '모바일셀');


WITH RECURSIVE CteDept(id, pid, dname, depth, h) AS (
  select id, pid, dname, 0, cast(id as char(10)) from Dept where pid = 0
  UNION ALL
  select d.id, d.pid, d.dname, depth+1, concat(c.h, '-', d.id)
	from CteDept c inner join Dept d on c.id = d.pid
) select /*+ SET_VAR(cte_max_recursion_depth = 20) */ 
		concat(repeat('↳', c.depth), ' ', c.dname), c.depth
        from CteDept c order by c.h;
        
        
        