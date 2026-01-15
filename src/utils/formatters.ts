/**
 * Utility functions for formatting and transforming data
 */

import {
    PLANT_OPTIONS,
    CARRIER_OPTIONS,
    STATUS_OPTIONS,
    REGION_OPTIONS,
} from "../constant/constants";

/**
 * แปลง value เป็น label จาก options array
 */
const getLabel = <T extends { value: string; label: string }>(
    value: string,
    options: readonly T[]
): string => {
    return options.find((option) => option.value === value)?.label || value;
};

/**
 * แปลง plant value เป็น label
 * @example getPlantLabel("snk") => "SNK"
 */
export const getPlantLabel = (value: string): string => {
    return getLabel(value, PLANT_OPTIONS);
};

/**
 * แปลง carrier value เป็น label
 * @example getCarrierLabel("KERRY_EXPRESS") => "Kerry Express"
 */
export const getCarrierLabel = (value: string): string => {
    return getLabel(value, CARRIER_OPTIONS);
};

/**
 * แปลง status value เป็น label
 * @example getStatusLabel("001") => "Loading Scheduler"
 */
export const getStatusLabel = (value: string): string => {
    return getLabel(value, STATUS_OPTIONS);
};

/**
 * แปลง region value เป็น label
 * @example getRegionLabel("CENTRAL") => "นครหลวง"
 */
export const getRegionLabel = (value: string): string => {
    return getLabel(value, REGION_OPTIONS);
};

/**
 * แปลงเวลาจากรูปแบบ HHMMSS เป็น HH:MM
 * @example formatTimeHHMMSS("080000") => "08:00"
 */
export const formatTimeHHMMSS = (time: string): string => {
    if (time?.length !== 6) return time || "";
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
};

/**
 * นับจำนวนข้อมูลตามฟิลด์ที่กำหนดและแปลงเป็น label
 */
export const countByField = <T>(
    data: T[],
    fieldKey: keyof T,
    options: readonly { value: string; label: string }[],
    getLabelFn: (value: string) => string
): { label: string; count: number }[] => {
    const counts: { [key: string]: number } = {};

    // นับจำนวนโดยใช้ label
    data.forEach((item) => {
        const value = item[fieldKey] as string;
        const label = getLabelFn(value);
        counts[label] = (counts[label] || 0) + 1;
    });

    // แปลงเป็น array ตาม options
    return options.map((option) => ({
        label: option.label,
        count: counts[option.label] || 0,
    }));
};
