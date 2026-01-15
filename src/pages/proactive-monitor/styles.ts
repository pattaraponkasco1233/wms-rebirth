/**
 * Style constants สำหรับ Overall Monitoring Tab
 */

export const OVERALL_MONITORING_STYLES = {
    // Shipment Table Styles
    shipmentNo: {
        fontWeight: "600" as const,
        color: "#1890ff",
    },
    plantLabel: {
        fontWeight: "500" as const,
    },
    statusBadge: {
        padding: "4px 12px",
        borderRadius: "4px",
        backgroundColor: "#e6f7ff",
        color: "#1890ff",
        fontWeight: "500" as const,
    },
    scheduledTime: {
        fontWeight: "600" as const,
        color: "#52c41a",
    },

    // Plant Load Table Styles
    timeSlot: {
        fontWeight: "bold" as const,
        fontSize: "14px",
    },
    plantSum: {
        fontSize: "12px",
        fontWeight: "bold" as const,
        color: "#52c41a",
        marginTop: "4px",
    },
    activeValue: {
        fontWeight: "600" as const,
        color: "#1890ff",
    },
    inactiveValue: {
        fontWeight: "normal" as const,
        color: "#d9d9d9",
    },
    totalValue: {
        fontWeight: "bold" as const,
        fontSize: "16px",
    },
} as const;
