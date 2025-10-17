import{ax as I,ay as w,j as t,R as k,S as x,c7 as j,cy as y,c9 as g,cK as u,aL as b,cL as _}from"./iframe-BKDoWgHq.js";import{w as d,c as D}from"./ContextDecorators-BcENn2ig.js";import{F as N,A as v}from"./FullførtStilling-CRpDBl2p.js";import{R as T}from"./GjenåpneStillingKnapp-CcoNYwYy.js";import{T as A}from"./TilgangskontrollForInnhold-DLway7Ez.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-gV7m6E18.js";import"./OrganisasjonsnummerAlert-CfPcIFBz.js";import"./VStack-B3A9RY2q.js";import"./BasePrimitive-CT8NIZJE.js";import"./List-Buho69gq.js";import"./Link-DFwMo79Q.js";import"./KandidatHendelseTag-Brl649es.js";import"./Tag-BUt2pJu8.js";import"./FileXMark-FeDq2Ysf.js";import"./Trash-rtYXz7QZ.js";import"./HandShakeHeart-DTrI0IiB.js";import"./Calendar-cy2kGKa4.js";import"./ThumbUp-BrJ85Q8J.js";import"./Table-DMk5gh2_.js";import"./util-ClF0mEkr.js";import"./format-CDKvSNBp.js";import"./match-BQKLQD_5.js";import"./parse-S4GxuH9G.js";import"./getDefaultOptions-C8ODERZH.js";import"./parseISO-Ci-fRiyg.js";import"./util-DEm2Fd7B.js";import"./accordion-DnyxfTaW.js";import"./index-RpxBl-sY.js";import"./index-r_en9jtA.js";import"./index-CFBykUbO.js";import"./ChevronDown-DAqA53JU.js";import"./Box-CxHpQBhL.js";import"./Bell-VnfSgXRk.js";import"./PersonChat-DfpepgNa.js";import"./Eye-Ce5kzcQG.js";import"./ProgressBar-CI9tujOQ.js";import"./EyeSlash-B0g1qbGs.js";import"./CircleSlash-C6y3PJJs.js";import"./Modal-DT3kgKxc.js";import"./floating-ui.react-BGZ9fdcN.js";import"./Date.Input-BcSHn9sJ.js";import"./useFormField-3mzbgjvi.js";import"./useControllableState-B3Jf7pLK.js";import"./Modal.context-D_pCVJiM.js";import"./Checkbox-9Y2lRa3L.js";import"./Fieldset-VTSXXLtU.js";import"./Pencil-B7hO8-hc.js";import"./PersonbrukerTekst-BdCaK3wI.js";import"./ClockDashed-CzmJSpCa.js";import"./Tasklist-hZIgHRBM.js";import"./ErrorBoundary-DNoVetg1.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
