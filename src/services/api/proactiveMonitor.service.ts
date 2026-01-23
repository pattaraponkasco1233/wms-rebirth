// src/services/api/proactiveMonitor.service.ts

import { ProactiveMonitorResponse, ProactiveMonitorFilter } from '@/models/proactive-monitor';

/**
 * Mock Data for Proactive Monitoring
 * Summary และ Detail ต้องสอดคล้องกัน:
 * - จำนวน shipments ในแต่ละ time slot ตรงกับจำนวน detail rows
 * - status ต้องนับตรงกับ shipmentStatus ใน details
 * - checkIn ต้องนับตรงกับ checkIn boolean ใน details
 */
const mockProactiveMonitorData: ProactiveMonitorResponse = {
    target: {
        delivey_check_in: { target: 90, actual: 85, diff: -5 },
        ready_to_ship: { target: 90, actual: 90, diff: 0 },
        multipick: { target: 90, actual: 95, diff: 5 }
    },
    summary: [
        {
            plantLoadTime: "08:00 - 09:00",
            checkInYes: 2,      // SHP001, SHP002
            checkInNo: 1,       // SHP003
            status001: 1,       // SHP003
            status002: 1,       // SHP001
            status003: 1,       // SHP002
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 3
        },
        {
            plantLoadTime: "09:00 - 10:00",
            checkInYes: 1,      // SHP004
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 1,       // SHP004
            status007: 0,
            status008: 0,
            status009: 0,
            total: 1
        },
        {
            plantLoadTime: "10:00 - 11:00",
            checkInYes: 2,      // SHP005, SHP006
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 1,       // SHP006
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 1,       // SHP005
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "11:00 - 12:00",
            checkInYes: 1,      // SHP007
            checkInNo: 1,       // SHP008
            status001: 0,
            status002: 1,       // SHP008
            status003: 0,
            status004: 0,
            status005: 1,       // SHP007
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "12:00 - 13:00",
            checkInYes: 1,      // SHP009
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 1,       // SHP009
            status008: 0,
            status009: 0,
            total: 1
        },
        {
            plantLoadTime: "13:00 - 14:00",
            checkInYes: 1,      // SHP010
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 1,       // SHP010
            total: 1
        },
        {
            plantLoadTime: "14:00 - 15:00",
            checkInYes: 2,      // SHP011, SHP012
            checkInNo: 0,
            status001: 0,
            status002: 1,       // SHP011
            status003: 1,       // SHP012
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "15:00 - 16:00",
            checkInYes: 1,      // SHP013
            checkInNo: 1,       // SHP014
            status001: 1,       // SHP014
            status002: 0,
            status003: 0,
            status004: 1,       // SHP013
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "16:00 - 17:00",
            checkInYes: 2,      // SHP015, SHP016
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 1,       // SHP015
            status006: 1,       // SHP016
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "17:00 - 18:00",
            checkInYes: 1,      // SHP017
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 1,       // SHP017
            status008: 0,
            status009: 0,
            total: 1
        },
        {
            plantLoadTime: "18:00 - 19:00",
            checkInYes: 2,      // SHP018, SHP019
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 1,       // SHP018
            status009: 1,       // SHP019
            total: 2
        },
        {
            plantLoadTime: "19:00 - 20:00",
            checkInYes: 1,      // SHP020
            checkInNo: 1,       // SHP021
            status001: 1,       // SHP021
            status002: 1,       // SHP020
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "20:00 - 21:00",
            checkInYes: 2,      // SHP022, SHP023
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 1,       // SHP022
            status004: 1,       // SHP023
            status005: 0,
            status006: 0,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "21:00 - 22:00",
            checkInYes: 2,      // SHP024, SHP025
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 1,       // SHP024
            status006: 1,       // SHP025
            status007: 0,
            status008: 0,
            status009: 0,
            total: 2
        },
        {
            plantLoadTime: "22:00 - 23:00",
            checkInYes: 1,      // SHP026
            checkInNo: 0,
            status001: 0,
            status002: 0,
            status003: 0,
            status004: 0,
            status005: 0,
            status006: 0,
            status007: 1,       // SHP026
            status008: 0,
            status009: 0,
            total: 1
        }
    ],
    details: [
        // 08:00 - 09:00 Time Slot (3 shipments)
        {
            shipmentNo: "SHP001",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "001",
            jobNumber: "JOB001",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "002",  // Booked
            checkIn: true,
            timeRemaining: "01:30:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "กก-1234",
            loadingScheduler: "2026-01-15 08:00:00",
            booked: "2026-01-15 08:15:00"
        },
        {
            shipmentNo: "SHP002",
            shipmentType: "Express",
            plant: "GLX",
            pickSeq: "002",
            jobNumber: "JOB002",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "003",  // Start Pick
            checkIn: true,
            timeRemaining: "00:45:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ขข-5678",
            loadingScheduler: "2026-01-15 08:30:00",
            booked: "2026-01-15 08:45:00",
            startPick: "2026-01-15 08:50:00"
        },
        {
            shipmentNo: "SHP003",
            shipmentType: "Regular",
            plant: "SSI",
            pickSeq: "003",
            jobNumber: "JOB003",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "001",  // Loading Scheduler
            checkIn: false,
            timeRemaining: "02:15:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "คค-9012",
            loadingScheduler: "2026-01-15 08:00:00"
        },
        // 09:00 - 10:00 Time Slot (1 shipment)
        {
            shipmentNo: "SHP004",
            shipmentType: "Express",
            plant: "SNK",
            pickSeq: "004",
            jobNumber: "JOB004",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "006",  // Assign Bay
            checkIn: true,
            timeRemaining: "00:20:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "งง-3456",
            loadingScheduler: "2026-01-15 09:00:00",
            booked: "2026-01-15 09:10:00",
            startPick: "2026-01-15 09:20:00",
            endPick: "2026-01-15 09:35:00",
            rts: "2026-01-15 09:40:00",
            assignBay: "2026-01-15 09:45:00"
        },
        // 10:00 - 11:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP005",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "005",
            jobNumber: "JOB005",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "008",  // End Load
            checkIn: true,
            timeRemaining: "00:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "จจ-7890",
            loadingScheduler: "2026-01-15 10:00:00",
            booked: "2026-01-15 10:10:00",
            startPick: "2026-01-15 10:20:00",
            endPick: "2026-01-15 10:35:00",
            rts: "2026-01-15 10:40:00",
            assignBay: "2026-01-15 10:45:00",
            startLoad: "2026-01-15 10:50:00",
            endLoad: "2026-01-15 10:55:00"
        },
        {
            shipmentNo: "SHP006",
            shipmentType: "Express",
            plant: "GLX",
            pickSeq: "006",
            jobNumber: "JOB006",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "004",  // End Pick
            checkIn: true,
            timeRemaining: "00:30:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ฉฉ-1122",
            loadingScheduler: "2026-01-15 10:00:00",
            booked: "2026-01-15 10:15:00",
            startPick: "2026-01-15 10:25:00",
            endPick: "2026-01-15 10:45:00"
        },
        // 11:00 - 12:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP007",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "007",
            jobNumber: "JOB007",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "005",  // RTS
            checkIn: true,
            timeRemaining: "00:15:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ชช-3344",
            loadingScheduler: "2026-01-15 11:00:00",
            booked: "2026-01-15 11:10:00",
            startPick: "2026-01-15 11:20:00",
            endPick: "2026-01-15 11:35:00",
            rts: "2026-01-15 11:40:00"
        },
        {
            shipmentNo: "SHP008",
            shipmentType: "Regular",
            plant: "SSI",
            pickSeq: "008",
            jobNumber: "JOB008",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "002",  // Booked
            checkIn: false,
            timeRemaining: "01:45:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ซซ-5566",
            loadingScheduler: "2026-01-15 11:00:00",
            booked: "2026-01-15 11:20:00"
        },
        // 12:00 - 13:00 Time Slot (1 shipment)
        {
            shipmentNo: "SHP009",
            shipmentType: "Express",
            plant: "SSF",
            pickSeq: "009",
            jobNumber: "JOB009",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "007",  // Start Load
            checkIn: true,
            timeRemaining: "00:10:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ญญ-7788",
            loadingScheduler: "2026-01-15 12:00:00",
            booked: "2026-01-15 12:10:00",
            startPick: "2026-01-15 12:15:00",
            endPick: "2026-01-15 12:25:00",
            rts: "2026-01-15 12:30:00",
            assignBay: "2026-01-15 12:35:00",
            startLoad: "2026-01-15 12:40:00"
        },
        // 13:00 - 14:00 Time Slot (1 shipment)
        {
            shipmentNo: "SHP010",
            shipmentType: "Regular",
            plant: "GLX",
            pickSeq: "010",
            jobNumber: "JOB010",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "009",  // Check Out
            checkIn: true,
            timeRemaining: "00:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ฎฎ-9900",
            loadingScheduler: "2026-01-15 13:00:00",
            booked: "2026-01-15 13:05:00",
            startPick: "2026-01-15 13:10:00",
            endPick: "2026-01-15 13:20:00",
            rts: "2026-01-15 13:25:00",
            assignBay: "2026-01-15 13:30:00",
            startLoad: "2026-01-15 13:35:00",
            endLoad: "2026-01-15 13:45:00",
            checkOut: "2026-01-15 13:50:00"
        },
        // 14:00 - 15:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP011",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "011",
            jobNumber: "JOB011",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "002",  // Booked
            checkIn: true,
            timeRemaining: "01:20:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ฏฏ-1122",
            loadingScheduler: "2026-01-15 14:00:00",
            booked: "2026-01-15 14:10:00"
        },
        {
            shipmentNo: "SHP012",
            shipmentType: "Express",
            plant: "SSI",
            pickSeq: "012",
            jobNumber: "JOB012",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "003",  // Start Pick
            checkIn: true,
            timeRemaining: "00:50:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ฐฐ-3344",
            loadingScheduler: "2026-01-15 14:00:00",
            booked: "2026-01-15 14:15:00",
            startPick: "2026-01-15 14:20:00"
        },
        // 15:00 - 16:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP013",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "013",
            jobNumber: "JOB013",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "004",  // End Pick
            checkIn: true,
            timeRemaining: "00:35:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ฑฑ-5566",
            loadingScheduler: "2026-01-15 15:00:00",
            booked: "2026-01-15 15:10:00",
            startPick: "2026-01-15 15:15:00",
            endPick: "2026-01-15 15:30:00"
        },
        {
            shipmentNo: "SHP014",
            shipmentType: "Regular",
            plant: "GLX",
            pickSeq: "014",
            jobNumber: "JOB014",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "001",  // Loading Scheduler
            checkIn: false,
            timeRemaining: "02:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ฒฒ-7788",
            loadingScheduler: "2026-01-15 15:00:00"
        },
        // 16:00 - 17:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP015",
            shipmentType: "Express",
            plant: "SNK",
            pickSeq: "015",
            jobNumber: "JOB015",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "005",  // RTS
            checkIn: true,
            timeRemaining: "00:25:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ณณ-9900",
            loadingScheduler: "2026-01-15 16:00:00",
            booked: "2026-01-15 16:05:00",
            startPick: "2026-01-15 16:10:00",
            endPick: "2026-01-15 16:20:00",
            rts: "2026-01-15 16:25:00"
        },
        {
            shipmentNo: "SHP016",
            shipmentType: "Regular",
            plant: "SSI",
            pickSeq: "016",
            jobNumber: "JOB016",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "006",  // Assign Bay
            checkIn: true,
            timeRemaining: "00:15:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ดด-1234",
            loadingScheduler: "2026-01-15 16:00:00",
            booked: "2026-01-15 16:10:00",
            startPick: "2026-01-15 16:15:00",
            endPick: "2026-01-15 16:25:00",
            rts: "2026-01-15 16:30:00",
            assignBay: "2026-01-15 16:35:00"
        },
        // 17:00 - 18:00 Time Slot (1 shipment)
        {
            shipmentNo: "SHP017",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "017",
            jobNumber: "JOB017",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "007",  // Start Load
            checkIn: true,
            timeRemaining: "00:10:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ตต-5678",
            loadingScheduler: "2026-01-15 17:00:00",
            booked: "2026-01-15 17:05:00",
            startPick: "2026-01-15 17:10:00",
            endPick: "2026-01-15 17:20:00",
            rts: "2026-01-15 17:25:00",
            assignBay: "2026-01-15 17:30:00",
            startLoad: "2026-01-15 17:35:00"
        },
        // 18:00 - 19:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP018",
            shipmentType: "Express",
            plant: "GLX",
            pickSeq: "018",
            jobNumber: "JOB018",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "008",  // End Load
            checkIn: true,
            timeRemaining: "00:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ถถ-9012",
            loadingScheduler: "2026-01-15 18:00:00",
            booked: "2026-01-15 18:05:00",
            startPick: "2026-01-15 18:10:00",
            endPick: "2026-01-15 18:20:00",
            rts: "2026-01-15 18:25:00",
            assignBay: "2026-01-15 18:30:00",
            startLoad: "2026-01-15 18:35:00",
            endLoad: "2026-01-15 18:45:00"
        },
        {
            shipmentNo: "SHP019",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "019",
            jobNumber: "JOB019",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "009",  // Check Out
            checkIn: true,
            timeRemaining: "00:00:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ทท-3456",
            loadingScheduler: "2026-01-15 18:00:00",
            booked: "2026-01-15 18:08:00",
            startPick: "2026-01-15 18:15:00",
            endPick: "2026-01-15 18:25:00",
            rts: "2026-01-15 18:30:00",
            assignBay: "2026-01-15 18:35:00",
            startLoad: "2026-01-15 18:40:00",
            endLoad: "2026-01-15 18:50:00",
            checkOut: "2026-01-15 18:55:00"
        },
        // 19:00 - 20:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP020",
            shipmentType: "Regular",
            plant: "SSI",
            pickSeq: "020",
            jobNumber: "JOB020",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "002",  // Booked
            checkIn: true,
            timeRemaining: "01:15:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ธธ-7890",
            loadingScheduler: "2026-01-15 19:00:00",
            booked: "2026-01-15 19:10:00"
        },
        {
            shipmentNo: "SHP021",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "021",
            jobNumber: "JOB021",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "001",  // Loading Scheduler
            checkIn: false,
            timeRemaining: "02:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "นน-1234",
            loadingScheduler: "2026-01-15 19:00:00"
        },
        // 20:00 - 21:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP022",
            shipmentType: "Express",
            plant: "GLX",
            pickSeq: "022",
            jobNumber: "JOB022",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "003",  // Start Pick
            checkIn: true,
            timeRemaining: "00:45:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "บบ-5678",
            loadingScheduler: "2026-01-15 20:00:00",
            booked: "2026-01-15 20:10:00",
            startPick: "2026-01-15 20:15:00"
        },
        {
            shipmentNo: "SHP023",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "023",
            jobNumber: "JOB023",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "004",  // End Pick
            checkIn: true,
            timeRemaining: "00:30:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ปป-9012",
            loadingScheduler: "2026-01-15 20:00:00",
            booked: "2026-01-15 20:08:00",
            startPick: "2026-01-15 20:15:00",
            endPick: "2026-01-15 20:30:00"
        },
        // 21:00 - 22:00 Time Slot (2 shipments)
        {
            shipmentNo: "SHP024",
            shipmentType: "Express",
            plant: "SSI",
            pickSeq: "024",
            jobNumber: "JOB024",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "005",  // RTS
            checkIn: true,
            timeRemaining: "00:20:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ผผ-3456",
            loadingScheduler: "2026-01-15 21:00:00",
            booked: "2026-01-15 21:05:00",
            startPick: "2026-01-15 21:10:00",
            endPick: "2026-01-15 21:22:00",
            rts: "2026-01-15 21:28:00"
        },
        {
            shipmentNo: "SHP025",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "025",
            jobNumber: "JOB025",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "006",  // Assign Bay
            checkIn: true,
            timeRemaining: "00:18:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "ฝฝ-7890",
            loadingScheduler: "2026-01-15 21:00:00",
            booked: "2026-01-15 21:07:00",
            startPick: "2026-01-15 21:12:00",
            endPick: "2026-01-15 21:25:00",
            rts: "2026-01-15 21:30:00",
            assignBay: "2026-01-15 21:35:00"
        },
        // 22:00 - 23:00 Time Slot (1 shipment)
        {
            shipmentNo: "SHP026",
            shipmentType: "Regular",
            plant: "GLX",
            pickSeq: "026",
            jobNumber: "JOB026",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "007",  // Start Load
            checkIn: true,
            timeRemaining: "00:12:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "พพ-1234",
            loadingScheduler: "2026-01-15 22:00:00",
            booked: "2026-01-15 22:05:00",
            startPick: "2026-01-15 22:10:00",
            endPick: "2026-01-15 22:20:00",
            rts: "2026-01-15 22:25:00",
            assignBay: "2026-01-15 22:30:00",
            startLoad: "2026-01-15 22:35:00"
        }
    ],
    grandTotal: {
        checkInYes: 22,     // All except SHP003, SHP008, SHP014, SHP021
        checkInNo: 4,       // SHP003, SHP008, SHP014, SHP021
        status001: 3,       // SHP003, SHP014, SHP021
        status002: 4,       // SHP001, SHP008, SHP011, SHP020
        status003: 3,       // SHP002, SHP012, SHP022
        status004: 3,       // SHP006, SHP013, SHP023
        status005: 3,       // SHP007, SHP015, SHP024
        status006: 3,       // SHP004, SHP016, SHP025
        status007: 3,       // SHP009, SHP017, SHP026
        status008: 2,       // SHP005, SHP018
        status009: 2,       // SHP010, SHP019
        total: 26          // รวมทั้งหมด 26 shipments
    }
};

/**
 * Fetch Proactive Monitoring Data
 */
export const fetchProactiveMonitorData = async (
    filter: Partial<ProactiveMonitorFilter>
): Promise<ProactiveMonitorResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get('/api/proactive-monitor', { params: filter });
    // return response.data;

    return mockProactiveMonitorData;
};
