        
def merge_dicts(dict1, dict2):
    # second dict's value, if present, overrides one from first
    result = {}
    for key in dict1.keys():
        old_value = dict1[key]

        if key in dict2.keys():
            if type(old_value) == dict:
                result[key] = merge_dicts(dict1[key], dict2[key])
            else:
                result[key] = dict2[key]
        else:
            result[key] = old_value
        
    return result



def find_in_list(list, field, criteria):
    result = [item for item in list if item[field] == criteria]
    return result