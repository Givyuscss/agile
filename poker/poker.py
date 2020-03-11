import unittest

def bool_straight(y):
    x = [x for x in y]
    if int(x[0]) == int(x[1])-1  and int(x[1]) == int(x[2])-1 and int(x[2]) == int(x[3])-1 and int(x[3]) == int(x[4])-1:
        return True
    else:
        return False
def score_of_input(poker_str):
    '''
    得分： 返回值
    散牌 1 [分值，牌从大到小]
    对子 2 [分值，对应的牌，其余牌从大到小]
    两对 3 [分值，对应的两张牌，其余牌]
    三条 4 [分值，对应的牌，其余牌从大到小]
    顺子 5 [分值，最大牌]
    同花 6 [分值，牌从大到小]
    葫芦 7 [分值，对应的两张牌]
    铁支 8 [分值，对应的牌，其余牌]
    同花顺 9 [分值，最大牌]
    '''
    sorted_str = sorted(poker_str)
    num_str = [x[0] for x in sorted_str]
    color_str = [x[1] for x in sorted_str]
    #替换字母数
    for i,substr in enumerate(num_str):
        if substr == 'J':
            num_str[i] = '11'
        elif substr == 'Q':
            num_str[i] = '12'
        elif substr == 'K':
            num_str[i] = '13'
        elif substr == 'A':
            num_str[i] = '14'
    for i,num in enumerate(num_str):
        num_str[i] = int(num)
    #统计数字
    map_num = dict()
    map_color = dict()
    for num in num_str:
        if num not in map_num.keys():
            map_num[num] = 1
        else:
            map_num[num] += 1
    for color in color_str:
        if color not in map_color.keys():
            map_color[color] = 1
        else:
            map_color[color] += 1
    tmp = sorted(map_num.items(),key = lambda x:x[1])
    #散牌
    if max(map_num.values()) == 1 and max(map_color.values()) != 5:
        return [1,sorted(map_num.keys(),reverse=True)] 
    #对子 
    elif max(map_num.values()) == 2:
        #两对
        if sorted(map_num.values())[-1] == sorted(map_num.values())[-2]:
            return [3,[tmp[-1],tmp[-2],tmp[-3]]]
        re_list = sorted(map_num.keys(),reverse=True)
        re_list.remove(tmp[-1][0])
        return [2,[tmp[-1],re_list]]
    #三条
    elif max(map_num.values()) == 3:
        #葫芦
        if sorted(map_num.values())[-2] == 2:
            return [7,sorted([tmp[-1],tmp[-2]],reverse=True)]
        re_list = sorted(map_num.keys(),reverse=True)
        re_list.remove(tmp[-1][0])
        return [3,re_list]
    #同花
    elif max(map_color.values()) == 5 and bool_straight(map_num.keys()) == False:
        return [6,int(max(map_num.keys()))]
    #铁支
    elif max(map_num.values()) == 4:
        return [8,tmp[-1],tmp[-2]]
    #顺子 
    elif bool_straight(map_num.keys()) == True:
        if max(map_color.values())==5:
            return [9,int(max(map_num.keys()))]
        else:
            return [5,int(max(map_num.keys()))]
    
def compare_pairs(x,y):
    score1 = score_of_input(x)
    score2 = score_of_input(y)
    #比较类别
    if score1[0]>score2[0]:
        return 'Black Win'
    elif score1[0]<score2[0]:
        return 'White Win'
    #类别相同，比较其余项
    elif score1[0] == score2[0]:
        #当时两对和葫芦时
        if score1[0] == 3 or score1 == 7:
            #比较第二对
            if score1[1].keys()>score2[1].keys():
                return 'Black Win'
            elif socre1[1].keys()<score2[1].keys():
                return 'White Win'
            #第二对相等
            else:
                if socre1[1][1].keys()>score2[1][1].keys():
                    return 'Black Win'
                elif score1[1][1].keys()<score2[1][1].keys():
                    return 'White Win'
                else:
                    return 'Tie' 
        else: 
            if score1[1] > score2[1]:
                return 'Black Win'
            elif score1[1] < score2[1]:
                return 'White Win'
            else:
                return "Tie"

#处理输入字符串
def process_input(x):
    input_str = x.split()
    input_str.remove('Black:')
    input_str.remove('White:')
    str1 = input_str[:5]
    str2 = input_str[5:]
    return str1,str2

class testdemo(unittest.TestCase):
    def test1(self):
        str1,str2 = process_input('Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH')
        self.assertEqual('White Win',compare_pairs(str1,str2))
    def test2(self):
        str1,str2 = process_input('Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S')
        self.assertEqual('Black Win',compare_pairs(str1,str2))
    def test3(self):
        str1,str2 = process_input('Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH')
        self.assertEqual('Black Win',compare_pairs(str1,str2))
    def test4(self):
        str1,str2 = process_input('Black: 2H 3D 5S 9C KD White: 2D 3H 5C 9S KH')
        self.assertEqual('Tie',compare_pairs(str1,str2))


if __name__ == '__main__':
    unittest.main(verbosity=2)


