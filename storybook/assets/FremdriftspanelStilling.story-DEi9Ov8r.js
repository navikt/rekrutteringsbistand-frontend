import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-BltkUtmC.js";import{w as d,c as D}from"./ContextDecorators-DX3xittK.js";import{F as N,A as v}from"./FullførtStilling-CZiaammc.js";import{R as T}from"./GjenåpneStillingKnapp-CPPkG7pj.js";import{T as A}from"./TilgangskontrollForInnhold-B6njUK_I.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ce-zi_zz.js";import"./OrganisasjonsnummerAlert-DDL7fw1q.js";import"./VStack-B9bjwo3B.js";import"./BasePrimitive-DAjONjQL.js";import"./List-CUxXFdQr.js";import"./Link-CgUQg2re.js";import"./KandidatHendelseTag-BLtnp3G2.js";import"./Tag-BEtLAmBu.js";import"./FileXMark-BmobqouE.js";import"./Trash-a4Yvwzwz.js";import"./HandShakeHeart-CHnXOj98.js";import"./Calendar-Cc086Lfd.js";import"./ThumbUp-DQ8y91R2.js";import"./Table-C0yHzIsv.js";import"./util-CZhmV-S2.js";import"./format-ybDTxhh7.js";import"./match-BLrIinR6.js";import"./parseISO-C3vqRaHz.js";import"./parse-f1XXS1lv.js";import"./getDefaultOptions-CSasNev0.js";import"./util-CLZpmQTt.js";import"./accordion-B-GqBOko.js";import"./index-B2WK0cM7.js";import"./index-CcgFGtge.js";import"./index-DFMvh3J2.js";import"./ChevronDown-Co0F-4GE.js";import"./Box-C5dcSuhR.js";import"./Bell-Dl3C5f8J.js";import"./PersonChat-BUE9l3ll.js";import"./Eye-DkHyHwih.js";import"./ProgressBar-CvnquCRV.js";import"./EyeSlash-CPzN--Gu.js";import"./CircleSlash-BOtCJj1F.js";import"./Modal-C1-8VaRB.js";import"./floating-ui.react-DxCSJHHz.js";import"./Date.Input-DJyfvOgD.js";import"./useFormField-DPiTQzna.js";import"./useControllableState-B-0TJHvp.js";import"./Modal.context-7dX16PMC.js";import"./Checkbox-XtnRdGMm.js";import"./Fieldset-dcJauBcm.js";import"./Pencil-D4lLOZx-.js";import"./PersonbrukerTekst-Cnu9Ydgn.js";import"./ClockDashed-D-ddScIK.js";import"./Tasklist-CG8DM3we.js";import"./ErrorBoundary-C0n0OCeO.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
