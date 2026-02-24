"use client";

import dynamic from "next/dynamic";
import { Document, Page, Text, View, StyleSheet, Font, usePDF } from "@react-pdf/renderer";
import Spinner from "./Spinner";

const PDFViewer = dynamic(() => import("./PDFViewer/PDFViewer"), { ssr: false });

Font.register({
    family: "BrightGrotesk",
    src: "/assets/fonts/Bright Grotesk/Normal/Bright Grotesk.ttf",
});

const styles = StyleSheet.create({
    page: {
        paddingVertical: "9%",
        paddingHorizontal: "10%",
        backgroundColor: "#ffffff",
    },
    text: {
        fontFamily: "BrightGrotesk",
        fontSize: 11,
        lineHeight: 1.8,
        color: "#1a1a1a",
    },
});

function TextPDFDocument({ text }: { text: string }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Page>
        </Document>
    );
}

export default function TextDocumentViewer({ text }: { text: string }) {
    const [instance] = usePDF({ document: <TextPDFDocument text={text} /> });

    if (instance.loading) return <Spinner size="lg" />;
    if (instance.error || !instance.url) return null;

    return <PDFViewer file={instance.url} />;
}
