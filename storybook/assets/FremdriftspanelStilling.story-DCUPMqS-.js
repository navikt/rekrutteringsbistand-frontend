import{j as t,e as k}from"./iframe-BZGI7Ig_.js";import{w as m,c as D}from"./ContextDecorators-BtIsLzpi.js";import{K as I}from"./schema.zod-Dwvq8Zyy.js";import{u as w}from"./useKandidatlisteForEier-BfEUlWu_.js";import{a as j}from"./StillingsContext-0iH-_-OF.js";import{R as T,F as x,A as b}from"./FullførtStilling-B6YMg7q_.js";import{K as g,I as y}from"./KandidatTyper-CkRsvxsW.js";import{a as _}from"./stilling-typer-DLlwa7NU.js";import{S as N}from"./SWRLaster-BBaxFb3n.js";import{T as A}from"./TilgangskontrollForInnhold-D1PxF3gS.js";import{m as u,a as v}from"./stillingMock-BtxAEQoL.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C78b2UBh.js";import"./OrganisasjonsnummerAlert-svrmRo8s.js";import"./VStack-CJffh7sy.js";import"./BasePrimitive-Dl-LHXGo.js";import"./List-CSL1zfoc.js";import"./Link-D091lGCu.js";import"./KandidatHendelseTag-D-j5Jvgt.js";import"./Tag-BDSeVM5B.js";import"./FileXMark-W-BAfzMc.js";import"./Trash-ZF0t-SRt.js";import"./HandShakeHeart-Bq1y94Ar.js";import"./Calendar-BbDlJIM5.js";import"./ThumbUp-C2gsDPJF.js";import"./Table-Sv3lnO08.js";import"./util-nc4EAXcZ.js";import"./format-DCzO9vOU.js";import"./startOfDay-lTP3GKUn.js";import"./match-DCN6kGAU.js";import"./parseISO-DJIM71K9.js";import"./parse-CG8pKw-3.js";import"./getDefaultOptions-YA01bVNM.js";import"./util-Bzm_XTyQ.js";import"./kandidat.mock-F3wnuv6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./index-DAgULPJc.js";import"./index-DZOmuGKb.js";import"./index-aGn2uf-9.js";import"./stilling.dto-Dd_wOmtL.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./oppdaterStilling-pxr69sPD.js";import"./Box-B9qWBmGB.js";import"./EyeSlash-C1dd8CHw.js";import"./CircleSlash-CE-9SPkF.js";import"./Modal-0KuFj30Z.js";import"./floating-ui.react-CePIoC5e.js";import"./Date.Input-Cog2CMqs.js";import"./useFormField-Czj1vEkU.js";import"./useControllableState-DL5RPXQs.js";import"./ChevronDown-BQhdyX28.js";import"./Modal.context-CzvA4Cfh.js";import"./Checkbox-CVyHKrRn.js";import"./Fieldset-FdzwHsjY.js";import"./Pencil-CTa2U-LU.js";import"./ClockDashed-BpU2aS01.js";import"./PersonChat-BYzYpGMf.js";import"./Tasklist-CFDyEVqb.js";import"./accordion-CUB9Lu_3.js";import"./index-DE6I7avJ.js";import"./index-Ds8LRZid.js";import"./index-CPNJfUh6.js";import"./Bell-G-R6eVLj.js";import"./Eye-Bu7IjeM0.js";import"./ProgressBar-DFuF1Ej-.js";import"./Feilmelding-G6ggJxep.js";import"./CopyButton-5dj8m9cm.js";import"./Checkmark-DLuShYHm.js";import"./Sidelaster-BMfr2Uml.js";import"./ErrorBoundary-CKRn-cY4.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=j(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(N,{hooks:[d],children:e=>{const F=e.status===I.Lukket&&i.stilling.status===_.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+R;return F?t.jsx(x,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(b,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const ti={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=v,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,ti as default};
