import globals from "../../globalProps";

export function checkFilter() {
    var filter = globals.objs.filter;
    if(filter.isLecturerMode){
        if(filter.lecturer === null){
            return false;
        }
    }else{
        if(filter.group === null) return false;
        if(filter.mode === null) return false;
        if(filter.semester === null) return false;
        if(filter.degree === null) return false;
        if(filter.fieldOfStudy === null) return false;
        if(filter.departament === null) return false;
        if(filter.academicYear === null) return false;
    }
    return true;
}