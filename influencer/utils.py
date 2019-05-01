

def handleEmptyAbsentKey(key,jsonResponse):
    if key not in jsonResponse:
        return None
    else:
        return jsonResponse[key]