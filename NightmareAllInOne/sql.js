/*
--select * FROM ProductNew order by remark desc
--select count(1) FROM ProductNew-- order by remark desc
--select * FROM ProductNew order by rowid desc
--select * from jdcategorynew where item in ('手机', '米面杂粮', '平板电视', ' 空调', '冰箱', '洗衣机', '笔记本', '净化器')
--update jdcategorynew set spiderflag = 1 where item in ('手机', '米面杂粮', '平板电视', ' 空调', '冰箱', '洗衣机', '笔记本', '净化器')
--select * from jdcategorynew where spiderflag = 1
--select * from jdcategorynew where category in ('大 家 电', '生活电器', '厨房电器', '个护健康', '电脑整机', '外设产品')
--update jdcategorynew set spiderflag = 1 where category in ('大 家 电', '生活电器', '厨房电器', '个护健康', '电脑整机', '外设产品')
 * */
# select * from jdcategory where spiderflag = 1 and spiderpageindex != pageinfo
#update jdcategory set skip = 1 where id = 508

#SELECT * FROM JDCategory where pageInfo != '' and SpiderFlag = 1 and PageInfo != SpiderPageIndex and skip != 1

#SELECT * FROM JDCategory where pageInfo != '' and SpiderFlag = 1 and PageInfo != SpiderPageIndex and skip != 1 limit 1

#select * from product order by logicid desc limit 10

#select * from product where logicid = 'ffff6220-caac-11e4-bf4f-5d7b93625d23'
